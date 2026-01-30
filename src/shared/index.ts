export * from './crypto.js';
export * from './http.js';

/**
 * 自定义支付异常类
 */
export class PayError extends Error {
  constructor(
    public message: string,
    public code: string | number = 'PAY_ERROR',
    public meta?: any
  ) {
    super(message);
    this.name = 'PayError';
  }
}