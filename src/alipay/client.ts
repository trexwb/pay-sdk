import { HttpClient } from '../shared/http.js';
import { CryptoUtils } from '../shared/crypto.js';

export interface AlipayConfig {
  appId: string;
  privateKey: string;      // 应用私钥 (PEM)
  alipayPublicKey?: string; // 支付宝公钥 (用于验签)
  gateway?: string;
}

export class AlipayClient extends HttpClient {
  constructor(private config: AlipayConfig) {
    super({ baseUrl: config.gateway || 'https://openapi.alipay.com/gateway.do' });
  }

  /**
   * 执行支付宝请求
   * @param method 接口名称, 如 alipay.trade.page.pay
   * @param bizContent 业务参数
   */
  async execute(method: string, bizContent: object) {
    const params: Record<string, string> = {
      app_id: this.config.appId,
      method: method,
      format: 'JSON',
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), // 格式: YYYY-MM-DD HH:mm:ss
      version: '1.0',
      biz_content: JSON.stringify(bizContent),
    };

    // 1. 参数排序并构造待签名字符串
    const signContent = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');

    // 2. 生成签名
    params.sign = CryptoUtils.sign(signContent, this.config.privateKey);

    // 3. 发送请求 (支付宝通常使用 Form 表单或 POST 参数)
    return this.request({
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: params // 支付宝网关接受这些作为 URL 参数
    });
  }
}