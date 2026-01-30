/**
 * 微信支付基础金额对象
 */
export interface Amount {
  total: number;        // 总金额，单位为分
  currency?: string;    // 货币类型，默认 CNY
}

/**
 * 支付者信息
 */
export interface Payer {
  openid: string;       // 用户在直连商户 appid 下的唯一标识
}

/**
 * JSAPI 下单请求参数
 */
export interface JsapiPrepayRequest {
  appid: string;        // 公众号ID
  mchid: string;        // 商户号
  description: string;  // 商品描述
  out_trade_no: string; // 商户订单号
  notify_url: string;   // 通知地址
  amount: Amount;
  payer: Payer;
  attach?: string;      // 附加数据
}

/**
 * 微信支付通用响应格式
 */
export interface WechatPrepayResponse {
  prepay_id: string;    // 预支付交易会话标识
}

/**
 * 微信支付签名验证参数 (前端调起支付所需)
 */
export interface WechatSignResult {
  appId: string;
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: 'RSA';
  paySign: string;
}