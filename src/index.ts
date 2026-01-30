// src/index.ts

export * from './alipay/index.js';
export * from './alipay/types.js';
export * from './wechat/index.js';
export * from './wechat/types.js';

import { AlipaySDK } from './alipay/index.js';
import { WechatPaySDK, WechatConfig } from './wechat/index.js';
import { BaseConfig } from './shared/types.js';

export class PayFactory {
  /**
   * 快速创建支付宝实例
   */
  static createAlipay(config: BaseConfig): AlipaySDK {
    return new AlipaySDK(config);
  }

  /**
   * 快速创建微信实例
   */
  static createWechat(config: WechatConfig): WechatPaySDK {
    return new WechatPaySDK(config);
  }
}


// --- 示例：支付宝扫码支付 ---
// const alipay = PayFactory.createAlipay(aliConfig);
// const { qr_code } = await alipay.createQrCodeOrder({
//   outTradeNo: 'ALI_SCAN_001',
//   totalAmount: '0.01',
//   subject: '门店收银'
// }, 'https://example.com/notify');

// // --- 示例：微信 H5 支付 ---
// const wechat = PayFactory.createWechat(wxConfig);
// const { h5_url } = await wechat.createH5Order({
//   out_trade_no: 'WX_H5_001',
//   description: '移动端购买',
//   amount: { total: 1 }, // 1分钱
//   scene_info: {
//     payer_client_ip: '1.1.1.1',
//     h5_info: { type: 'Wap' }
//   }
// }, 'https://example.com/notify');