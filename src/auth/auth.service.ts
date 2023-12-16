import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
// import * as argon from 'argonjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginAuthDto } from './dto/loginAuth.dto';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async sendConfirmationEmail(
    email: string,
    confirmationToken: string,
  ): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        // Configure your email service here
        service: 'gmail',
        auth: {
          user: 'huzafa.abbasi98@gmail.com',
          pass: 'tzwaqonchawvwutu',
        },
      });

      const confirmationLink = `http://localhost:3000/auth/verify-email/${confirmationToken}`;

      const mailOptions = {
        from: 'huzafa.abbasi98@gmail.com',
        to: email,
        subject: 'Confirm Your Email',
        text: `Click the following link to confirm your email: ${confirmationLink}`,
      };

      await transporter.sendMail(mailOptions);

      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending confirmation email: ', error);
    }
  }

  generateToken = (length = 32): string => {
    return randomBytes(length).toString('hex');
  };

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    const confirmationToken = this.generateToken();

    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser && !existingUser.isConfirmed) {
      // User is registered but not confirmed, update the confirmation token
      const confirmationToken = this.generateToken();
      await this.prisma.user.update({
        where: { id: existingUser.id },
        data: { confirmationToken: confirmationToken },
      });

      // Send a new confirmation email
      await this.sendConfirmationEmail(existingUser.email, confirmationToken);

      // Return an appropriate response (e.g., indicating that a new confirmation email is sent)
      return { message: 'A new confirmation email has been sent.' };
    }
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          confirmationToken: confirmationToken,
        },
      });

      await this.sendConfirmationEmail(user.email, confirmationToken);
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async verifyEmail(confirmationToken: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        confirmationToken,
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid confirmation token');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isConfirmed: true,
        confirmationToken: null,
      },
    });

    console.log('Email verified successfully');
  }

  async signin(dto: LoginAuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user || user.isConfirmed == false)
      throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = (user.hash = dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: secret,
    });

    return {
      access_token: token,
      email: email,
      userId: userId,
    } as { access_token: string; email: string; userId: number };
  }

  async resetPassword(email: string, newPassword: string) {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // If user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Generate new password hash
    const newHash = await argon.hash(newPassword);

    // Update user's password in the db
    const updatedUser = await this.prisma.user.update({
      where: { email },
      data: { hash: newHash },
    });

    return updatedUser;
  }

  async updateUser(userId: number, newEmail: string, newPassword: string) {
    // Find the user by id
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // If user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Generate new password hash
    const newHash = await argon.hash(newPassword);

    // Update user's email and password in the db
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        email: newEmail,
        hash: newHash,
      },
    });

    return updatedUser;
  }
}
