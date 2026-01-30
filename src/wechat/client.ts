import { HttpClient } from '../shared/http.js';
import { CryptoUtils } from '../shared/crypto.js';

export interface WechatConfig {
  mchid: string;               // 商户号
  serialNo: string;            // 商户证书序列号
  privateKey: string;          // 商户私钥 (PEM)
  apiV3Key: string;            // API v3 密钥 (用于解密回调)
}

export class WechatPayClient extends HttpClient {
  constructor(private config: WechatConfig) {
    super({ baseUrl: 'https://api.mch.weixin.qq.com/v3' });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use((axiosConfig) => {
      const method = axiosConfig.method?.toUpperCase() || 'GET';
      const url = new URL(axiosConfig.url!, this.instance.defaults.baseURL);
      const pathname = url.pathname + url.search;
      const timestamp = CryptoUtils.timestamp();
      const nonce = CryptoUtils.nonceStr();
      const body = method === 'GET' || !axiosConfig.data ? '' : JSON.stringify(axiosConfig.data);

      // 1. 构造签名串 (严格遵守换行符规范)
      const message = `${method}\n${pathname}\n${timestamp}\n${nonce}\n${body}\n`;

      // 2. 生成签名
      const signature = CryptoUtils.sign(message, this.config.privateKey);

      // 3. 设置 Authorization 头
      const auth = `WECHATPAY2-SHA256-RSA2048 mchid="${this.config.mchid}",nonce_str="${nonce}",signature="${signature}",timestamp="${timestamp}",serial_no="${this.config.serialNo}"`;

      axiosConfig.headers['Authorization'] = auth;
      return axiosConfig;
    });
  }

  /**
   * 示例：JSAPI 下单
   */
  async transactionsJsapi(data: any) {
    return this.request({
      method: 'POST',
      url: '/pay/transactions/jsapi',
      data
    });
  }
}