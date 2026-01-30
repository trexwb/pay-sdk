/**
 * 支付宝统一收单下单业务参数 (biz_content)
 */
export interface AlipayTradeBizContent {
  out_trade_no: string;    // 商户订单号
  total_amount: string;    // 订单总金额，单位为元，精确到小数点后两位
  subject: string;         // 订单标题
  product_code: string;    // 销售产品码，如 QUICK_MSECURITY_PAY
  body?: string;           // 订单描述
  timeout_express?: string; // 该笔订单允许的最晚付款时间
  goods_detail?: any[];    // 订单包含的商品列表信息
}

/**
 * 支付宝 OpenAPI 公共响应
 */
export interface AlipayCommonResponse {
  code: string;            // 网关返回码
  msg: string;             // 网关返回码描述
  sub_code?: string;       // 业务返回码
  sub_msg?: string;        // 业务返回码描述
  sign: string;            // 签名
}

/**
 * 交易查询响应
 */
export interface AlipayTradeQueryResponse extends AlipayCommonResponse {
  alipay_trade_query_response: {
    trade_no: string;      // 支付宝交易号
    out_trade_no: string;
    buyer_logon_id: string;
    trade_status: 'WAIT_BUYER_PAY' | 'TRADE_CLOSED' | 'TRADE_SUCCESS' | 'TRADE_FINISHED';
    total_amount: string;
  };
}