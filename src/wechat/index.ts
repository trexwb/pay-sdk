import WechatPay from 'wechatpay-node-v3';
import { WechatNativeParams, WechatNotifyBody, WechatH5Params } from './types.js';

export interface WechatConfig {
  appId: string;
  mchid: string;
  privateKey: string;      // 商户私钥 (API证书内容)
  platformPublicKey: string; // 微信支付平台公钥
  apiV3Key: string;         // API V3 密钥
  serialNo: string;         // 证书序列号
}

export class WechatPaySDK {
  private pay: any;

  constructor(config: WechatConfig) {
    this.pay = new WechatPay({
      appid: config.appId,
      mchid: config.mchid,
      publicKey: Buffer.from(config.platformPublicKey, 'utf8'), // 将字符串转换为Buffer
      privateKey: Buffer.from(config.privateKey, 'utf8'),      // 同样处理私钥
      key: config.apiV3Key,
    });
  }

  /**
   * Native 支付下单
   * 返回 code_url，前端需将其转为二维码
   */
  async createNativeOrder(params: WechatNativeParams, notifyUrl: string) {
    // 微信 V3 接口要求：金额单位为分
    const res = await this.pay.transactions_native({
      ...params,
      notify_url: notifyUrl,
    });
    return res; // 包含 { code_url: 'weixin://wxpay/...' }
  }

  /**
   * H5 支付下单
   * 返回 h5_url，前端通过 location.href 跳转
   */
  async createH5Order(params: WechatH5Params, notifyUrl: string) {
    return this.pay.transactions_h5({
      ...params,
      notify_url: notifyUrl,
    });
  }

  /**
   * 回调通知验签与解密
   * 微信 V3 回调数据是加密的，wechatpay-node-v3 提供了内置方法
   */
  async verifyAndDecryptNotify(headers: any, body: WechatNotifyBody) {
    // 该库通常会处理签名校验并自动解密 resource 字段
    // 注意：需要 headers 中的 wechatpay-signature 等信息
    try {
      const result = await this.pay.verifySign(headers, body);
      if (!result) throw new Error('WechatPay verify signature failed');

      // 解密报文内容
      const deciphered = this.pay.decipher_gcm(
        body.resource.ciphertext,
        body.resource.associated_data,
        body.resource.nonce
      );
      return JSON.parse(deciphered);
    } catch (e) {
      const error = e as Error;
      throw new Error(`WechatPay notification error: ${error.message}`);
    }
  }

  /**
   * 查询订单
   */
  async queryOrder(outTradeNo: string) {
    return this.pay.query({ out_trade_no: outTradeNo });
  }

  /**
   * 关闭订单
   */
  async closeOrder(outTradeNo: string) {
    return this.pay.close(outTradeNo);
  }
}