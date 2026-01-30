export interface BaseConfig {
  appId: string;
  privateKey: string;      // 商户私钥
  platformPublicKey: string; // 微信支付平台公钥 / 支付宝公钥
}

export enum PayType {
  WECHAT = 'WECHAT',
  ALIPAY = 'ALIPAY'
}