"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
        this.generateToken = () => {
            const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
            return randomNumber;
        };
    }
    async sendSuccessFullRegistrationEmail(email) {
        const transporter = nodemailer.createTransport({
            host: 'send.one.com',
            port: 465,
            secure: true,
            auth: {
                user: 'info@spootech.com',
                pass: 'Welcome123.',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        console.log('email', email);
        let mailOptions = {
            from: '"Spootech", <info@spootech.com>',
            to: email,
            subject: 'Registrierung erfolgreich!',
            html: `<b>Registrierung erfolgreich!</b><p>Ihre Registrierung war erfolgreich!</p><p>Dies ist eine automatisch generierte E-Mail.</p><p><b>Support Team</b></p>`,
        };
        await transporter.sendMail(mailOptions);
    }
    async sendConfirmationEmail(email, confirmationToken) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'send.one.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'info@spootech.com',
                    pass: 'Welcome123.',
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            console.log('email', email);
            let mailOptions = {
                from: '"Spootech", <info@spootech.com>',
                to: email,
                subject: confirmationToken + ' Ihr Token zum zurücksetzen Ihres Passwortes',
                html: `<b>${confirmationToken}</b><p>Ihr Token zur Wiederherstellung Ihres Passwortes!</p> <p>Bitte geben Sie diesen Token in der App ein, um Ihr Passwort zurückzusetzen.</p><p>Dies ist eine automatisch generierte E-Mail.</p><p><b>Support Team</b></p>`,
            };
            await transporter.sendMail(mailOptions);
            console.log('Confirmation email sent successfully');
        }
        catch (error) {
            console.error('Error sending confirmation email: ', error);
        }
    }
    async signup(dto) {
        const hash = await argon.hash(dto.password);
        console.log('hash', hash);
        const confirmationToken = this.generateToken();
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser && existingUser.isConfirmed) {
            throw new common_1.ForbiddenException('Credentials taken');
        }
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
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }
    async verifyEmail(confirmationToken) {
        const user = await this.prisma.user.findUnique({
            where: {
                confirmationToken,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Invalid confirmation token');
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
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user || user.isConfirmed == false)
            throw new common_1.ForbiddenException('Credentials incorrect');
        console.log('user', user);
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches)
            throw new common_1.ForbiddenException('Credentials incorrect');
        return this.signToken(user.id, user.email);
    }
    async signToken(userId, email) {
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
            expires: new Date(Date.now() + 60 * 60 * 1000),
        };
    }
    async updateUser(userId, newEmail, newPassword) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.ForbiddenException('User not found');
        }
        const newHash = await argon.hash(newPassword);
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                email: newEmail,
                hash: newHash,
            },
        });
        return updatedUser;
    }
    async forgotPassword(email) {
        console.log('email', email);
        const user = await this.prisma.user.findFirst({
            where: { email },
        });
        if (!user) {
            throw new common_1.ForbiddenException('User not found');
        }
        const passwordResetToken = this.generateToken();
        console.log('passwordResetToken', passwordResetToken);
        const updatedUser = await this.prisma.user.update({
            where: { email: user.email },
            data: { confirmationToken: passwordResetToken },
        });
        console.log('updatedUser', updatedUser);
        console.log('email', email);
        console.log('passwordResetToken', passwordResetToken);
        await this.sendConfirmationEmail(updatedUser.email, updatedUser.confirmationToken);
        return updatedUser;
    }
    async resetPassword(email, newPassword) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.ForbiddenException('User not found');
        }
        const newHash = await argon.hash(newPassword);
        const updatedUser = await this.prisma.user.update({
            where: { email },
            data: { hash: newHash },
        });
        return updatedUser;
    }
    async deleteOrder(orderId) {
        console.log('Deleting order with id:', orderId);
        try {
            await this.prisma.cancelled.deleteMany({ where: { orderId } });
            await this.prisma.closedContractPartner.deleteMany({
                where: { orderId },
            });
            await this.prisma.notPossible.deleteMany({ where: { orderId } });
            await this.prisma.planned.deleteMany({ where: { orderId } });
            await this.prisma.postponed.deleteMany({ where: { orderId } });
            await this.prisma.received.deleteMany({ where: { orderId } });
            await this.prisma.rejected.deleteMany({ where: { orderId } });
            await this.prisma.orderStatus.deleteMany({ where: { orderId } });
            await this.prisma.customerContact.deleteMany({ where: { orderId } });
            const deletedOrder = await this.prisma.order.delete({
                where: { id: orderId },
            });
            console.log('Deleted order:', deletedOrder);
            return deletedOrder;
        }
        catch (error) {
            console.error('Error deleting order:', error);
            throw new Error('Order could not be deleted. Please check for related data.');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map