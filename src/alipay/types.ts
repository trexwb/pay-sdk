// src/alipay/types.ts

export interface AlipayTradePagePayParams {
  outTradeNo: string;      // 商户订单号
  totalAmount: string;     // 订单总金额，单位为元
  subject: string;         // 订单标题
  productCode?: string;    // 销售产品码，电脑网站支付固定为：FAST_INSTANT_TRADE_PAY
  body?: string;           // 订单描述
}

export interface AlipayNotifyData {
  [key: string]: any;      // 支付宝回调的具体字段
  sign: string;            // 签名
  sign_type: string;
  trade_status: string;    // 交易状态
}

export interface AlipayTradePrecreateParams {
  outTradeNo: string;
  totalAmount: string;
  subject: string;
  body?: string;
  storeId?: string; // 选填：商户门店编号
}