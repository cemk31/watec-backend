import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
      this.transporter = nodemailer.createTransport({
        host: this.configService.get('SMTP_HOST'),
        port: this.configService.get('SMTP_PORT'),
        secure: false, // Wahr für Port 465, falsch für andere Ports
        auth: {
          user: this.configService.get('SMTP_USER'),
          pass: this.configService.get('SMTP_PASS'),
        },
      });
    }
  
    async sendMail(to: string, subject: string, text: string, html: string): Promise<void> {
      const mailOptions = {
        from: 'cem@spootech.com', // Absenderadresse
        to: to, // Liste der Empfänger
        subject: subject, // Betreffzeile
        text: text, // Klartextkörper
        html: html, // HTML-Körper
      };
  
      await this.transporter.sendMail(mailOptions);
    }
  }