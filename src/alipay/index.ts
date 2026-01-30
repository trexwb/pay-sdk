// 导出支付宝客户端
export { AlipayClient } from './client.js';

// 导出支付宝相关的类型定义（假设你在 types.ts 中定义了它们）
export * from './types/index.js';

/**
 * 支付宝常量定义
 */
export const ALIPAY_GATEWAY = 'https://openapi.alipay.com/gateway.do';
export const ALIPAY_GATEWAY_SANDBOX = 'https://openapi-sandbox.dl.alipaydev.com/gateway.do';