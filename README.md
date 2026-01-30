这份 `README.md` 旨在为开发者提供清晰的接入指南，涵盖了安装、初始化以及微信/支付宝双平台的调用示例。

---

# Pay-SDK

一个基于 **TypeScript** 和 **ESM** 模式构建的轻量级支付集成库。本项目严格遵循微信支付 V3 和支付宝 OpenAPI 的签名逻辑，提供统一且强类型的开发体验。

还未完成，暂时占个窝，慢慢来写！！！！

## 🚀 特性

* **原生 ESM 支持**：基于 `"type": "module"` 编写，完美契合现代 Node.js 生态。
* **自动化签名**：内置拦截器，自动处理微信 V3 的 `Authorization` 头和支付宝的 `RSA2` 签名。
* **强类型定义**：完整的 Request/Response 接口定义，提供极致的 IDE 补全体验。
* **单包多导出**：支持按需引入模块，减少代码冗余。

---

## 📦 安装

```bash
npm install pay-sdk
# 或者使用 pnpm
pnpm add pay-sdk

```

---

## 🛠️ 快速开始

### 1. 微信支付 (WeChat Pay V3)

```typescript
import { Wechat } from 'pay-sdk';

const client = new Wechat.WechatPayClient({
  mchid: '190000****',
  serialNo: '582262770A000***********',
  privateKey: '-----BEGIN PRIVATE KEY-----\n...', // 证书私钥
  apiV3Key: 'your_api_v3_key_32_chars',
});

// JSAPI 下单
const res = await client.transactionsJsapi({
  appid: 'wxd678efh567xy123',
  mchid: '1230000109',
  description: '测试商品',
  out_trade_no: 'sdk_order_001',
  notify_url: 'https://example.com/notify',
  amount: { total: 1 }, // 1分钱
  payer: { openid: 'oUpv75k9c_T9xxxx' }
});

console.log(res.prepay_id);

```

### 2. 支付宝 (Alipay OpenAPI)

```typescript
import { Alipay } from 'pay-sdk';

const client = new Alipay.AlipayClient({
  appId: '202100*******',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----\n...', // 应用私钥
  gateway: Alipay.ALIPAY_GATEWAY // 可选，默认为正式环境
});

// 发起 App 支付查询
const result = await client.execute('alipay.trade.query', {
  out_trade_no: 'sdk_order_001'
});

console.log(result.alipay_trade_query_response.trade_status);

```

---

## 📂 项目结构

```text
src/
├── shared/     # 核心工具（RSA签名、HTTP封装）
├── wechat/     # 微信支付模块（自动注入V3签名头）
├── alipay/     # 支付宝模块（自动处理参数排序与签名）
└── index.ts    # 统一导出入口

```

---

## 🔐 安全建议

1. **私钥保护**：切勿将 `.pem` 私钥文件提交至 Git 仓库。建议使用环境变量或加密的配置中心加载。
2. **验签**：在处理支付回调（Notification）时，务必调用 SDK 提供的验签逻辑，防止伪造通知。

---

## 📄 开源协议

[MIT](https://www.google.com/search?q=LICENSE)

---

---

## Stargazers over time

[![Stargazers over time](https://starchart.cc/trexwb/node-laravel.svg?variant=adaptive)](https://starchart.cc/trexwb/node-laravel)