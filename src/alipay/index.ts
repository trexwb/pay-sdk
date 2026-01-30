import { AlipaySdk } from 'alipay-sdk';
import { BaseConfig } from '../shared/types.js';
import { AlipayTradePagePayParams, AlipayNotifyData, AlipayTradePrecreateParams } from './types.js';

export class AlipaySDK {
  private sdk: any;

  constructor(config: BaseConfig) {
    this.sdk = new AlipaySdk({
      appId: config.appId,
      privateKey: config.privateKey,
      alipayPublicKey: config.platformPublicKey,
      signType: 'RSA2',
    });
  }

  /**
   * 电脑网站支付下单 (QR_CODE_OFFLINE)
   * 返回一个 Form 表单，前端直接渲染即可跳转
   */
  async createPageOrder(params: AlipayTradePagePayParams, notifyUrl: string, returnUrl?: string) {
    return this.sdk.pageExec('alipay.trade.page.pay', {
      notify_url: notifyUrl,
      return_url: returnUrl,
      bizContent: {
        ...params,
        product_code: 'QR_CODE_OFFLINE',
      },
    });
  }

  /**
   * 扫码支付 (当面付 - 用户扫码)
   * 返回 qr_code 字段，由前端生成二维码
   */
  async createQrCodeOrder(params: AlipayTradePrecreateParams, notifyUrl: string) {
    return this.sdk.exec('alipay.trade.precreate', {
      notify_url: notifyUrl,
      bizContent: params,
    });
  }

  /**
   * 异步通知验签
   * 支付宝回调你的服务器时，必须先验证签名
   */
  checkNotifySign(postData: AlipayNotifyData): boolean {
    return this.sdk.checkNotifySign(postData);
  }

  /**
   * 主动查询订单状态
   */
  async queryOrder(outTradeNo: string) {
    return this.sdk.exec('alipay.trade.query', {
      bizContent: {
        out_trade_no: outTradeNo,
      },
    });
  }

  /**
   * 关闭订单
   */
  async closeOrder(outTradeNo: string) {
    return this.sdk.exec('alipay.trade.close', {
      bizContent: {
        out_trade_no: outTradeNo,
      },
    });
  }
}