import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import { ADMITAD_API_URL, ADMITAD_URL } from './admitad-cpa.constants';
import { TokenResponseInterface, DeepLinkApiQueryOptions, AdmitadApiSettings } from './interfaces';
import { DeepLinkService } from './services';

export class AdmitadCpa {
  private readonly http = axios;
  private readonly deepLinkService: DeepLinkService;
  private readonly admitadApiSettings: AdmitadApiSettings;
  private readonly axiosConfig: AxiosRequestConfig;

  constructor(admitadApiSettings: AdmitadApiSettings, axiosConfig?: AxiosRequestConfig) {
    this.deepLinkService = new DeepLinkService();
    this.admitadApiSettings = admitadApiSettings;
    this.axiosConfig = { ...(axiosConfig ?? {}), baseURL: ADMITAD_API_URL };
  }

  /**
   * @description Check Admitad site available. Checking main domain of Admitad
   * @returns {Promise<string>} Parsed axios data
   */
  static async checkSite(): Promise<string> {
    const response = await axios.get('en/', { baseURL: ADMITAD_URL });

    return response.data;
  }

  /**
   * @description Create token for Admitad API
   * @returns {Promise<TokenResponseInterface>} Token response
   */
  async createToken(): Promise<TokenResponseInterface> {
    const { header, client_id } = this.makeBasicAuthorizationHeader();

    const body = stringify({
      scope: 'deeplink_generator advcampaigns_for_website',
      client_id,
      grant_type: 'client_credentials',
    });

    return this.post<TokenResponseInterface, string>('token/', body.toString(), {
      headers: { authorization: header, contentType: 'application/x-www-form-urlencoded;charset=UTF-8' },
    });
  }

  /**
   * Make deep link
   * @param {DeepLinkApiQueryOptions} deepLinkOptions
   * @return {Array} Array of deepLinks
   */
  async deepLink(deepLinkOptions: DeepLinkApiQueryOptions): Promise<string[]> {
    const admitadRequestUrl = this.deepLinkService.createRequestUrl(deepLinkOptions);
    const token = await this.createToken();

    const deepLinks: string[] = await this.get(admitadRequestUrl, {
      headers: {
        authorization: `Bearer ${token.access_token}`,
      },
    });

    return deepLinks;
  }

  /**
   * Basic auth generator
   * @param {string} platform
   */
  private makeBasicAuthorizationHeader(): { client_id: string; header: string } {
    const { client_secret, client_id } = this.admitadApiSettings;

    const header = `Basic ${Buffer.from(client_id + ':' + client_secret).toString('base64')}`;

    return {
      client_id,
      header,
    };
  }

  /**
   * @description Handle error
   * @param error - Axios error
   */
  private handleError(error: AxiosError<{ message: string; error_description: string; error_code: number }>): never {
    const errorMessage = error?.response?.data?.error_description || error.message;
    throw new Error(errorMessage);
  }

  private async request<T, U>(method: 'get' | 'post', path: string, data?: U, config?: AxiosRequestConfig): Promise<T> {
    const requestConfig = { ...this.axiosConfig, ...config, method, url: path, data };
    try {
      const response = await this.http.request<T>(requestConfig);

      return response?.data;
    } catch (error: unknown) {
      this.handleError(error as AxiosError<{ message: string; error_description: string; error_code: number }>);
    }
  }

  private async post<T, U>(path: string, body: U, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T, U>('post', path, body, config);
  }

  private async get<T, U>(path: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T, U>('get', path, undefined, config);
  }
}
