import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SupportDTO } from './dto/supportDTO';
import * as dotenv from 'dotenv';

dotenv.config(); // Lädt die .env Datei

@Injectable()
export class SupportService {
  async sendSupportEmail(dto: SupportDTO): Promise<string> {
    console.log('Support Email:', dto);
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // Aus der .env Datei
        port: Number(process.env.SMTP_PORT), // Aus der .env Datei
        secure: process.env.SMTP_SECURE === 'true', // Aus der .env Datei (convert string to boolean)
        auth: {
          user: process.env.SMTP_USER, // Aus der .env Datei
          pass: process.env.SMTP_PASS, // Aus der .env Datei
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // E-Mail an das Support-Team
      const mailOptions = {
        from: `"WATEC Support" <${process.env.SMTP_USER}>`, // Dynamisch aus .env
        to: 'info@spootech.com', // Support Email
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

      // Bestätigungs-E-Mail an den Benutzer
      const userConfirmationMail = {
        from: `"WATEC Support" <${process.env.SMTP_USER}>`, // Dynamisch aus .env
        to: dto.email, // E-Mail des Benutzers
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

      // Sende beide E-Mails
      await transporter.sendMail(mailOptions); // An das Support-Team
      await transporter.sendMail(userConfirmationMail); // An den Benutzer

      return 'Support Email erfolgreich gesendet.';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Fehler beim Senden der Support-Anfrage');
    }
  }
}
