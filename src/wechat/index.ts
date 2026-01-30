// 导出微信支付客户端
export { WechatPayClient } from './client.js';

// 导出微信支付相关的类型定义
export * from './types/index.js';

/**
 * 微信支付 V3 接口根地址
 */
export const WECHAT_PAY_API_ROOT = 'https://api.mch.weixin.qq.com/v3';

/**
 * 微信支付常用枚举 (示例)
 */
export enum TradeType {
  JSAPI = 'JSAPI',
  NATIVE = 'NATIVE',
  APP = 'APP',
  MWEB = 'H5'
}