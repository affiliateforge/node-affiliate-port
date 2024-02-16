import { DeepLinkApiQueryOptions } from '../interfaces';

import { DeepLinkService } from './deep-link.service';

describe('DeepLinkService', () => {
  let deepLinkService: DeepLinkService;

  beforeEach(() => {
    deepLinkService = new DeepLinkService();
    jest.clearAllMocks();
  });

  describe('validateRequestOptions', () => {
    it('should throw an error if w_id or c_id does not exist', () => {
      const options: DeepLinkApiQueryOptions = { urls: ['https://example.com'] } as DeepLinkApiQueryOptions;
      expect(() => deepLinkService.validateRequestOptions(options)).toThrow('Invalid w_id or c_id: they should exist');
    });

    it('should throw an error if ulp does not exist or its length is more than 200', () => {
      const options: DeepLinkApiQueryOptions = {
        w_id: '1',
        c_id: '1',
        urls: new Array(201).fill('https://example.com'),
      };
      expect(() => deepLinkService.validateRequestOptions(options)).toThrow(
        'Invalid ulp: it should exist and its length should not be more than 200',
      );
    });

    it('should throw an error if any subid exists and its length is more than 50', () => {
      const options: DeepLinkApiQueryOptions = {
        w_id: '1',
        c_id: '1',
        urls: ['https://example.com'],
        subid: 'a'.repeat(51),
      };
      expect(() => deepLinkService.validateRequestOptions(options)).toThrow(
        'Invalid subid: if it exists, its length should not be more than 50',
      );
    });

    it('should throw an error if subid4 exists and its length is more than 120', () => {
      const options: DeepLinkApiQueryOptions = {
        w_id: '1',
        c_id: '1',
        urls: ['https://example.com'],
        subid4: 'a'.repeat(121),
      };
      expect(() => deepLinkService.validateRequestOptions(options)).toThrow(
        'Invalid subid4: its length should not be more than 120',
      );
    });

    it('should throw an error if any subid value includes %00', () => {
      const options: DeepLinkApiQueryOptions = { w_id: '1', c_id: '1', urls: ['https://example.com'], subid: '%00' };
      expect(() => deepLinkService.validateRequestOptions(options)).toThrow(
        'Invalid subid: the value should not include %00',
      );
    });

    it('should not throw an error if all options are valid', () => {
      const options: DeepLinkApiQueryOptions = {
        w_id: '1',
        c_id: '1',
        urls: ['https://example.com'],
        subid: 'valid_subid',
      };
      expect(() => deepLinkService.validateRequestOptions(options)).not.toThrow();
    });
  });

  describe('createRequestUrl', () => {
    it('should create a correct URL', () => {
      const options: DeepLinkApiQueryOptions = { w_id: '1', c_id: '1', urls: ['https://example.com'] };
      const url = deepLinkService.createRequestUrl(options);
      expect(url).toBe('deeplink/1/advcampaign/1/?ulp=https%3A%2F%2Fexample.com');
    });
  });
});
