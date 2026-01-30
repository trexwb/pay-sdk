import { createSign, createVerify } from 'node:crypto';

export class CryptoUtils {
  /**
   * 生成 RSA-SHA256 签名
   * @param data 待签名字符串
   * @param privateKey 私钥内容 (PEM 格式)
   */
  static sign(data: string, privateKey: string): string {
    const signer = createSign('RSA-SHA256');
    signer.update(data);
    signer.end();
    return signer.sign(privateKey, 'base64');
  }

  /**
   * 验证 RSA-SHA256 签名
   * @param data 原始字符串
   * @param signature 签名值 (Base64)
   * @param publicKey 公钥/平台证书内容 (PEM 格式)
   */
  static verify(data: string, signature: string, publicKey: string): boolean {
    const verifier = createVerify('RSA-SHA256');
    verifier.update(data);
    verifier.end();
    return verifier.verify(publicKey, signature, 'base64');
  }

  /**
   * 生成微信支付所需的随机字符串
   */
  static nonceStr(length = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  }

  /**
   * 获取当前 Unix 时间戳（秒）
   */
  static timestamp(): string {
    return Math.floor(Date.now() / 1000).toString();
  }
}