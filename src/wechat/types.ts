// src/wechat/types.ts

export interface WechatNativeParams {
  out_trade_no: string;   // 商户订单号
  description: string;    // 商品描述
  amount: {
    total: number;        // 金额，单位为分（注意：微信是分，支付宝是元）
    currency?: string;    // 默认 CNY
  };
  attach?: string;        // 附加数据
}

export interface WechatNotifyResource {
  algorithm: string;
  ciphertext: string;     // 加密报文
  associated_data?: string;
  nonce: string;
}

export interface WechatNotifyBody {
  id: string;
  event_type: string;
  resource: WechatNotifyResource;
}

export interface WechatH5Params {
  out_trade_no: string;
  description: string;
  amount: {
    total: number; // 单位：分
  };
  scene_info: {
    payer_client_ip: string; // 必填：用户终端IP
    h5_info: {
      type: string;          // 必填：场景类型，如 "iOS", "Android", "Wap"
      wap_url?: string;      // 选填：WAP 网站 URL
      wap_name?: string;     // 选填：WAP 网站名
    };
  };
}