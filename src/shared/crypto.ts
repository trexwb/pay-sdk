import crypto from 'node:crypto';

export class CryptoHelper {
  // SHA256 with RSA 签名
  static sign(data: string, privateKey: string): string {
    const signer = crypto.createSign('RSA-SHA256');
    signer.update(data);
    return signer.sign(privateKey, 'base64');
  }

  // 生成微信 V3 随机字符串
  static generateNonce(): string {
    return crypto.randomBytes(16).toString('hex');
  }
}