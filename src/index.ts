/**
 * 统一支付 SDK 导出入口
 */

// 1. 导出工具类（如加密、HTTP 封装），方便开发者自行扩展
export * from './shared/index.js';

// 2. 导出支付宝模块
export * as Alipay from './alipay/index.js';

// 3. 导出微信支付模块
export * as Wechat from './wechat/index.js';

// 4. 版本信息
export const SDK_VERSION = '1.0.0';

/**
 * 使用示例:
 * import { Alipay, Wechat, CryptoUtils } from 'pay-sdk';
 * const alipayClient = new Alipay.AlipayClient(...);
 */