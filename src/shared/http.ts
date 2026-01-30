import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

export interface HttpClientConfig extends AxiosRequestConfig {
  baseUrl: string;
}

export class HttpClient {
  protected instance: AxiosInstance;

  constructor(config: HttpClientConfig) {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Pay-SDK-TS/1.0.0'
      }
    });

    // 预留拦截器位置，方便子类实现签名逻辑
    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    // 基础错误处理
    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => {
        const status = error.response?.status;
        const data = error.response?.data;
        return Promise.reject({ status, ...data });
      }
    );
  }

  // 获取原始 axios 实例以便自定义拦截器
  get axiosInstance() {
    return this.instance;
  }

  async request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request<any, T>(config);
  }
}