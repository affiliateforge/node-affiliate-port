export interface TokenResponseInterface {
  username: string;
  first_name: string;
  last_name: string;
  group: string;
  language: string;
  access_token: string;
  expires_in: number;
  token_type: string;
  code: string;
  scope: string;
  id: number;
  refresh_token: string;
}

export interface ClientParamsInterface {
  client_id: string;
  project: string;
}

export interface BaseApiRequestOptions {
  w_id: string;
}
export interface RetailersApiQueryOptions extends BaseApiRequestOptions {
  limit: string;
  offset: string;
}

export interface DeepLinkApiQueryOptions extends BaseApiRequestOptions {
  subid?: string;
  subid1?: string;
  subid2?: string;
  subid3?: string;
  subid4?: string;
  c_id: string;
  urls: string[];
}

export interface DeepLinkApiResponse {
  deepLinks: string[];
}

export interface RetailersResponseInterface {
  results: [
    {
      status: string;
      rating: string;
      image: string;
      gotolink: string;
      description: string;
      traffics: [
        {
          enabled: boolean;
          name: string;
          type: string;
          id: number;
        },
      ];
      actions: [
        {
          // eslint-disable-next-line camelcase
          payment_size: string;
          type: string;
          name: string;
          id: number;
        },
      ];
      // eslint-disable-next-line camelcase
      site_url: string;
      regions: [
        {
          region: string;
        },
      ];
      currency: string;
      geotargeting: boolean;
      // eslint-disable-next-line camelcase
      coupon_iframe_denied: boolean;
      connected: boolean;
      id: string;
      cr: number;
      ecpc: number;
      epc: number;
      // eslint-disable-next-line camelcase
      cr_trend: number;
      // eslint-disable-next-line camelcase
      ecpc_trend: number;
      // eslint-disable-next-line camelcase
      epc_trend: number;
      categories: [
        {
          language: string;
          name: string;
          parent?: {
            language: string;
            name: string;
            parent: string;
            id: number;
          };
          id: number;
        },
      ];
      name: string;
      // eslint-disable-next-line camelcase
      action_type: string;
      // eslint-disable-next-line camelcase
      individual_terms: boolean;
      // eslint-disable-next-line camelcase
      allow_deeplink: boolean;
      // eslint-disable-next-line camelcase
      action_testing_limit: number;
      // eslint-disable-next-line camelcase
      mobile_device_type: string;
      // eslint-disable-next-line camelcase
      mobile_os_type: string;
      // eslint-disable-next-line camelcase
      mobile_os: string;
      // eslint-disable-next-line camelcase
      action_countries: [string];
      // eslint-disable-next-line camelcase
      allow_actions_all_countries: boolean;
    },
  ];
  _meta: {
    count: number;
    limit: number;
    offset: number;
  };
}

export interface Res<T> {
  data: T;
}

export interface AdmitadApiSettings {
  client_id: string;
  client_secret: string;
}
