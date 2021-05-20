import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Article, Category, Ad } from '../types';

// API 원형
abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(instance: AxiosInstance) {
    this.instance = instance;

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  };

  protected _handleRequest(config:AxiosRequestConfig) : AxiosRequestConfig {
    return config;
  }

  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    return axiosResponse;
  }

  protected _handleError(error: AxiosError) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답
      alert('요청을 처리하는 중에 오류가 발생하였습니다.');
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못함
      alert('서버 또는 네트워크의 상태가 좋지 않습니다.');
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  };

  
  public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, config);
  }

}


export interface MainApi__category_list__IResponseBody  {
  category: Category[]
}

export interface MainApi__article_list__IResponseBody {
  data: Article[],
  total: number
}

export interface MainApi__article_view__IResponseBody  {
  data: Article
}

export interface MainApi__ads_list__IResponseBody {
  data: Ad[],
  total: number
}



export class MainApi extends HttpClient {
  public constructor() {
    super(
      axios.create({
        baseURL:'https://problem.comento.kr',
      })
    );
  }

  protected _handleRequest(config:AxiosRequestConfig) {
    config.params = {};
    return config;
  }
  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    return axiosResponse;
  }


  public category_list() {
    return this.get<MainApi__category_list__IResponseBody>(`/api/category`);
  }
 
  public article_list(ord: string, category: string, limit: number) {
    return this.get<MainApi__article_list__IResponseBody>(`/api/list?page=1&ord=${ord}${category}&limit=${limit}`);
  }

  public article_view(id: number) {
    return this.get<MainApi__article_view__IResponseBody>(`/api/view?id=${id}`);
  }

  public ads_list(limit: number) {
    return this.get<MainApi__ads_list__IResponseBody>(`/api/ads?page=1&limit=${limit}`);
  }

} 

