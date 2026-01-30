# Pay-SDK

一个基于 TypeScript (ESM) 的轻量级支付集成库，统一了 **微信支付 V3** 与 **支付宝 OpenAPI** 的核心调用流程。
> 还未完成，暂时占个窝，慢慢来写！！！！

## 🚀 特性

* **统一化接口**：消除微信与支付宝参数命名的差异感，快速上手。
* **原生 ESM 支持**：基于 `type: "module"` 开发，完美契合现代 Node.js 生态。
* **强类型定义**：提供完整的接口参数与返回值的 TS 类型约束。
* **闭环处理**：涵盖下单、异步通知验签、主动查询及关闭订单。

---

## 📦 安装

```bash
npm install pay-sdk
# 或者
yarn add pay-sdk

```

---

## 🛠️ 快速开始

### 1. 支付宝 (Alipay)

支持 **电脑网站支付** 与 **扫码支付 (当面付)**。

```typescript
import { PayFactory } from 'pay-sdk';

const alipay = PayFactory.createAlipay({
  appId: '2021000...',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----...',
  platformPublicKey: '支付宝公钥...',
});

// A. 电脑网站支付 (返回 HTML Form)
const html = await alipay.createPageOrder({
  outTradeNo: 'ORDER_001',
  totalAmount: '100.00',
  subject: '测试商品'
}, 'https://your-api.com/ali/notify');

// B. 扫码支付 (返回 qr_code)
const { qr_code } = await alipay.createQrCodeOrder({
  outTradeNo: 'ORDER_002',
  totalAmount: '0.01',
  subject: '线下扫码'
}, 'https://your-api.com/ali/notify');

```

### 2. 微信支付 (WeChat Pay V3)

支持 **Native 扫码支付** 与 **H5 支付**。

```typescript
import { PayFactory } from 'pay-sdk';

const wechat = PayFactory.createWechat({
  appId: 'wx...',
  mchid: '160...',
  serialNo: '证书序列号...',
  privateKey: '-----BEGIN PRIVATE KEY-----...',
  platformPublicKey: '微信平台公钥...',
  apiV3Key: '32位密钥...',
});

// A. Native 支付 (返回 code_url)
const { code_url } = await wechat.createNativeOrder({
  out_trade_no: 'WX_001',
  description: '测试商品',
  amount: { total: 100 } // 注意：微信单位为分
}, 'https://your-api.com/wx/notify');

// B. H5 支付 (返回 h5_url)
const { h5_url } = await wechat.createH5Order({
  out_trade_no: 'WX_H5_001',
  description: '移动端购买',
  amount: { total: 100 },
  scene_info: {
    payer_client_ip: '1.1.1.1',
    h5_info: { type: 'Wap' }
  }
}, 'https://your-api.com/wx/notify');

```

---

## 🔗 核心流程闭环

### 异步通知处理 (Webhook)

当用户支付成功，支付平台会回调你的接口。

| 平台 | 验证方式 | 返回响应 |
| --- | --- | --- |
| **支付宝** | `alipay.checkNotifySign(body)` | 字符串 `success` |
| **微信** | `wechat.verifyAndDecryptNotify(headers, body)` | JSON `{ code: "SUCCESS" }` |

### 主动查询订单

```typescript
// 支付宝查询
const aliStatus = await alipay.queryOrder('ORDER_001');

// 微信查询
const wxStatus = await wechat.queryOrder('WX_001');

```

---

## 📂 目录结构

```text
src/
├── alipay/     # 支付宝 SDK 封装 (基于 alipay-sdk)
├── wechat/     # 微信 SDK 封装 (基于 wechatpay-node-v3)
├── shared/     # 公共加密、工具函数与基础类型
└── index.ts    # 统一导出入口

```

---

## 📝 开发注意事项

1. **金额单位**：支付宝输入以“元”为单位（String），微信输入以“分”为单位（Number）。
2. **密钥格式**：
* 支付宝私钥通常包含 `-----BEGIN RSA PRIVATE KEY-----`。
* 微信私钥为 API 证书中的 `apiclient_key.pem` 内容。


3. **环境要求**：Node.js >= 18.x (推荐)。

---

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来完善退款、分账等更多功能。

[![Stargazers over time](https://starchart.cc/trexwb/node-laravel.svg?variant=adaptive)](https://starchart.cc/trexwb/node-laravel)