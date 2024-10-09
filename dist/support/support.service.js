"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
let SupportService = class SupportService {
    async sendSupportEmail(dto) {
        console.log('Support Email:', dto);
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            const mailOptions = {
                from: `"WATEC Support" <${process.env.SMTP_USER}>`,
                to: 'info@spootech.com',
                subject: `Support Anfrage: ${dto.subject}`,
                html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="background-color: #f2f2f2; padding: 10px; text-align: center; color: #333;">WATEC Support</h2>
            <p><strong>Name:</strong> ${dto.name}</p>
            <p><strong>Email:</strong> ${dto.email}</p>
            <p><strong>Betreff:</strong> ${dto.subject}</p>
            <p><strong>Nachricht:</strong></p>
            <div style="padding: 10px; background-color: #f9f9f9; border-left: 4px solid #ccc;">
              <p>${dto.message}</p>
            </div>
            <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
              <p>Danke für Ihre Anfrage. Wir werden uns so schnell wie möglich bei Ihnen melden.</p>
              <p>WATEC Support Team</p>
            </footer>
          </div>
        `,
            };
            const userConfirmationMail = {
                from: `"WATEC Support" <${process.env.SMTP_USER}>`,
                to: dto.email,
                subject: `Bestätigung: Ihre Support Anfrage ist eingegangen`,
                html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="background-color: #f2f2f2; padding: 10px; text-align: center; color: #333;">WATEC Support</h2>
            <p>Sehr geehrte/r ${dto.name},</p>
            <p>Vielen Dank für Ihre Nachricht! Ihre Support-Anfrage mit dem Betreff <strong>${dto.subject}</strong> ist erfolgreich bei uns eingegangen.</p>
            <p>Unser Support-Team wird sich schnellstmöglich bei Ihnen melden.</p>
            <br>
            <p>Mit freundlichen Grüßen,</p>
            <p>Ihr WATEC Support Team</p>
          </div>
        `,
            };
            await transporter.sendMail(mailOptions);
            await transporter.sendMail(userConfirmationMail);
            return 'Support Email erfolgreich gesendet.';
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Fehler beim Senden der Support-Anfrage');
        }
    }
};
SupportService = __decorate([
    (0, common_1.Injectable)()
], SupportService);
exports.SupportService = SupportService;
//# sourceMappingURL=support.service.js.map