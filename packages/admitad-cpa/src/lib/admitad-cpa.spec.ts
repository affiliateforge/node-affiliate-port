import axios from 'axios';

import { AdmitadCpa } from './admitad-cpa';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AdmitadCpa', () => {
  let admitadCpa: AdmitadCpa;

  beforeEach(() => {
    admitadCpa = new AdmitadCpa({ client_id: 'test', client_secret: 'test' });
    jest.clearAllMocks();
  });

  it('should check site availability', async () => {
    mockedAxios.get.mockResolvedValue({ data: 'site available' });

    const result = await AdmitadCpa.checkSite();
    expect(result).toBe('site available');
  });

  it('should create token', async () => {
    const tokenResponse = { access_token: 'test_token', expires_in: 3600 };
    jest.spyOn(admitadCpa['http'], 'request').mockResolvedValueOnce({ data: tokenResponse });
    const result = await admitadCpa.createToken();

    expect(admitadCpa['http']['request']).toHaveBeenCalledWith(
      expect.objectContaining({
        data: 'scope=deeplink_generator%20advcampaigns_for_website&client_id=test&grant_type=client_credentials',
      }),
    );
    expect(result).toEqual(tokenResponse);
  });

  it('should create token', async () => {
    const tokenResponse = { access_token: 'test_token', expires_in: 3600 };
    jest.spyOn(admitadCpa['http'], 'request').mockResolvedValueOnce({ data: tokenResponse });

    const result = await admitadCpa.createToken();
    expect(result).toEqual(tokenResponse);
  });

  it('should create deep link', async () => {
    const deepLinkResponse = ['https://example.com/deep_link'];
    const tokenResponse = { access_token: 'test_token', expires_in: 3600 };

    // Mock the internal http request method instead of axios directly
    jest
      .spyOn(admitadCpa['http'], 'request')
      .mockResolvedValueOnce({ data: tokenResponse }) // For createToken call
      .mockResolvedValueOnce({ data: deepLinkResponse }); // For deepLink call

    const result = await admitadCpa.deepLink({ w_id: '1', c_id: '1', urls: ['https://example.com'] });

    expect(result).toEqual(deepLinkResponse);
  });
  it('should handle error', async () => {
    jest.spyOn(admitadCpa['http'], 'request').mockRejectedValue(new Error('Network Error'));

    await expect(admitadCpa['get']('error')).rejects.toThrow('Network Error');
  });
});
