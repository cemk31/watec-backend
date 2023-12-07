import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class DecryptService {
    private encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'base64'); // Stellen Sie sicher, dass der Schlüssel die richtige Länge hat
  private ivLength = 16; // AES Blockgröße in Byte

  encrypt(text: string): string {
    console.log('text', text);
    const iv = crypto.randomBytes(this.ivLength);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  decrypt(text: string): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.encryptionKey, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  // Beispielverwendung
  testEncryption() {
    const textToEncrypt = 'x';
    const encrypted = this.encrypt(textToEncrypt);
    console.log('Encrypted:', encrypted);

    const decrypted = this.decrypt(encrypted);
    console.log('Decrypted:', decrypted);
  }
}