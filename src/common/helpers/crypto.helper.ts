import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-cbc';

  encrypt(payload: any, secretKey: string, iv: string): string {
    const cipher = crypto.createCipheriv(
      this.ENCRYPTION_ALGORITHM,
      Buffer.from(secretKey, 'hex'),
      Buffer.from(iv, 'hex'),
    );

    const encryptedData = cipher.update(
      JSON.stringify(payload),
      'utf-8',
      'base64',
    );
    return encryptedData + cipher.final('base64');
  }

  decrypt(encrypted: string, secretKey: string, iv: string): any {
    const decipher = crypto.createDecipheriv(
      this.ENCRYPTION_ALGORITHM,
      Buffer.from(secretKey, 'hex'),
      Buffer.from(iv, 'hex'),
    );

    const encryptedData = Buffer.from(encrypted, 'base64');

    let decryptedData = decipher.update(encryptedData);
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);

    return JSON.parse(decryptedData.toString());
  }
}

export const encrypt = (
  payload: any,
  secretKey: string,
  iv: string,
): string => {
  const service = new CryptoService();
  return service.encrypt(payload, secretKey, iv);
};

export const decrypt = (
  encrypted: string,
  secretKey: string,
  iv: string,
): any => {
  const service = new CryptoService();
  return service.decrypt(encrypted, secretKey, iv);
};
