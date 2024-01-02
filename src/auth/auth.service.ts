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
import { Order } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async sendSuccessFullRegistrationEmail(email: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "send.one.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@spootech.com",
        pass: "Welcome123.",
      },
      tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
    });
    console.log("email", email);
    let mailOptions = {
      from: '"Spootech", <info@spootech.com>', // sender address
      to: email, // list of receivers
      subject: "Registrierung erfolgreich!", // Subject line
      // text: "Hello world?", // plain text body
      html: `<b>Registrierung erfolgreich!</b><p>Ihre Registrierung war erfolgreich!</p><p>Dies ist eine automatisch generierte E-Mail.</p><p><b>Support Team</b></p>`, // html body
    };
    await transporter.sendMail(mailOptions);
  }

  async sendConfirmationEmail(
    email: string,
    confirmationToken: string,
  ): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: "send.one.com",
        port: 465,
        secure: true,
        auth: {
          user: "info@spootech.com",
          pass: "Welcome123.",
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
      });
      // const confirmationLink = `http://localhost:3000/auth/verify-email/${confirmationToken}`;
      console.log("email", email);
      let mailOptions = {
        from: '"Spootech", <info@spootech.com>', // sender address
        to: email, // list of receivers
        subject: confirmationToken + " Ihr Token zum zurücksetzen Ihres Passwortes", // Subject line
        // text: "Hello world?", // plain text body
        html: `<b>${confirmationToken}</b><p>Ihr Token zur Wiederherstellung Ihres Passwortes!</p> <p>Bitte geben Sie diesen Token in der App ein, um Ihr Passwort zurückzusetzen.</p><p>Dies ist eine automatisch generierte E-Mail.</p><p><b>Support Team</b></p>`, // html body
    };
      await transporter.sendMail(mailOptions);

      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending confirmation email: ', error);
    }
  }

  generateToken = (): string => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
    return randomNumber;
  };

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    console.log("hash", hash);

    const confirmationToken = this.generateToken();

    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // if (existingUser && !existingUser.isConfirmed) {
    //   // User is registered but not confirmed, update the confirmation token
    //   const confirmationToken = this.generateToken();
    //   await this.prisma.user.update({
    //     where: { id: existingUser.id },
    //     data: { confirmationToken: confirmationToken },
    //   });

    //   console.log("ExistingUser", existingUser.email, confirmationToken);
    //   // Send a new confirmation email
    //   await this.sendConfirmationEmail(existingUser.email, confirmationToken);

    //   // Return an appropriate response (e.g., indicating that a new confirmation email is sent)
    //   return { message: 'A new confirmation email has been sent.' };
    // }
    if (existingUser && existingUser.isConfirmed) {
      throw new ForbiddenException('Credentials taken');
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
      await this.sendSuccessFullRegistrationEmail(user.email);
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

    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
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

  async forgotPassword(email: string) {
    console.log("email", email);
    // Find the user by email
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    // If user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    // Generate a new password reset token
    const passwordResetToken = this.generateToken();
    console.log("passwordResetToken", passwordResetToken);
    // Update user's password reset token in the db
    const updatedUser = await this.prisma.user.update({
      where: { email: user.email }, // Add a default value or initializer for the "id" property
      data: { confirmationToken: passwordResetToken },
    });
    console.log("updatedUser", updatedUser);
    console.log("email", email);
    console.log("passwordResetToken", passwordResetToken);
    // Send a password reset email
    await this.sendConfirmationEmail(updatedUser.email, updatedUser.confirmationToken);

    return updatedUser;
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

  async deleteOrder(orderId: number): Promise<Order | null> {
    console.log('Deleting order with id:', orderId);
    try {
    // Löschen der abhängigen Datensätze
    await this.prisma.cancelled.deleteMany({ where: { orderId } });
    await this.prisma.closedContractPartner.deleteMany({ where: { orderId } });
    await this.prisma.notPossible.deleteMany({ where: { orderId } });
    await this.prisma.planned.deleteMany({ where: { orderId } });
    await this.prisma.postponed.deleteMany({ where: { orderId } });
    await this.prisma.received.deleteMany({ where: { orderId } });
    await this.prisma.rejected.deleteMany({ where: { orderId } });
    await this.prisma.orderStatus.deleteMany({ where: { orderId } });
    await this.prisma.customerContact.deleteMany({ where: { orderId } });
    // Fügen Sie hier ähnliche Löschvorgänge für andere abhängige Tabellen hinzu...

    // Löschen des Auftrags
    const deletedOrder = await this.prisma.order.delete({ where: { id: orderId } });
    console.log('Deleted order:', deletedOrder);
    
    return deletedOrder;
    } catch (error) {
      console.error('Error deleting order:', error);
      // Hier könnten Sie einen spezifischen Fehlercode zurückgeben oder eine benutzerfreundliche Fehlermeldung
      throw new Error('Order could not be deleted. Please check for related data.');
    }
  }
}
