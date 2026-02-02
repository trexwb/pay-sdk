# Pay-SDK: 微信 & 支付宝集成开发包

这是一个基于 **TypeScript (ES Module)** 构建的轻量级支付 SDK 封装库。它通过抽象统一的调用逻辑，帮助开发人员快速在 **微信支付 V3** 和 **支付宝 OpenAPI** 之间进行业务切换。

> 组件还没完成开发，仅仅是先整理了框架结构，占个坑！！后续后续开发中，会添加更多功能。

## 🚀 核心组件

本 SDK 基于以下官方/主流社区维护的底层库构建：

* **支付宝**: [`alipay-sdk`](https://github.com/alipay/alipay-sdk-nodejs-all) - 官方 Node.js SDK。
* **微信支付**: [`wechatpay-node-v3`](https://github.com/klover2/wechatpay-node-v3-ts) - 深度支持 V3 接口与证书自动管理的成熟库。

---

## 📂 目录结构说明

```text
./
├── src/
│   ├── shared/      # 通用层：加密算法、基础类型、常量定义
│   ├── alipay/      # 支付宝模块：涵盖 PC 网站、扫码支付、条码支付
│   ├── wechat/      # 微信模块：涵盖 Native、H5、JSAPI 支付
│   └── index.ts     # 统一入口：暴露 PayFactory 工厂类
├── dist/            # 编译后的 ESM 代码
└── package.json     # 定义导出入口 (exports)

```

---

## 🛠️ 核心功能支持矩阵

| 支付场景 | 支付宝方法 (Alipay) | 微信支付方法 (WeChat) |
| --- | --- | --- |
| **PC/电脑网站** | `createPageOrder` (FAST_INSTANT_TRADE_PAY) | `createNativeOrder` (Native) |
| **线下扫码 (用户扫商家)** | `createQrCodeOrder` (PRECREATE) | `createNativeOrder` (Native) |
| **条码支付 (商家扫用户)** | `payByBarCode` (FACE_TO_FACE) | *(需通过 MicroPay 扩展)* |
| **手机浏览器 (H5)** | `createPageOrder` (自动识别) | `createH5Order` (MWEB) |
| **微信内支付 (JSAPI)** | - | `createJSAPIOrder` (二次签名完成) |
| **通用功能** | `queryOrder` / `checkNotifySign` | `queryOrder` / `verifyAndDecryptNotify` |

---

## 📦 快速开始

### 1. 初始化工厂

```typescript
import { PayFactory } from 'pay-sdk';

// 支付宝配置
const alipay = PayFactory.createAlipay({
  appId: '2021000...',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----...',
  platformPublicKey: '支付宝公钥...',
});

// 微信配置 (V3)
const wechat = PayFactory.createWechat({
  appId: 'wx...',
  mchid: '160...',
  serialNo: '商户证书序列号',
  privateKey: '-----BEGIN PRIVATE KEY-----...',
  apiV3Key: '32位密钥',
  platformPublicKey: '微信平台公钥',
});

```

### 2. 发起支付示例 (闭环实现)

#### 支付宝：PC 网站支付

```typescript
const formHtml = await alipay.createPageOrder({
  outTradeNo: 'ORDER_001',
  totalAmount: '100.00',
  subject: 'MacBook Pro'
}, 'https://your-api.com/ali/notify');

// 前端直接渲染 formHtml

```

#### 微信：JSAPI 支付 (自动处理二次签名)

```typescript
const payParams = await wechat.createJSAPIOrder({
  out_trade_no: 'ORDER_002',
  description: '云服务订阅',
  amount: { total: 990 }, // 9.9元
  payer: { openid: 'user_openid' },
  notify_url: 'https://your-api.com/wx/notify'
});

// 直接将 payParams 返回给前端，用于 WeixinJSBridge 唤起支付

```

---

## 🛡️ 异步通知处理 (Webhook)

本 SDK 封装了复杂的验签与解密过程：

```typescript
// 支付宝验签
const isValid = alipay.checkNotifySign(ctx.request.body);

// 微信 V3 验签与报文解密
const data = await wechat.verifyAndDecryptNotify(ctx.headers, ctx.request.body);
console.log('支付成功的订单号:', data.out_trade_no);

```

---

## 📝 注意事项

1. **金额单位**: 支付宝使用“元”(String: `1.00`)，微信支付使用“分”(Number: `100`)。
2. **证书管理**: 微信 V3 必须提供证书序列号 (`serialNo`)。
3. **运行环境**: 需 Node.js 18+，项目需设置 `"type": "module"`。

---

## 🤝 Stargazers

[![Stargazers over time](https://starchart.cc/trexwb/pay-sdk.svg?variant=adaptive)](https://starchart.cc/trexwb/pay-sdk)