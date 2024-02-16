import { stringify } from 'qs';

import { DeepLinkApiQueryOptions } from '../interfaces';

import { BaseService } from './base.service';

export class DeepLinkService extends BaseService<DeepLinkApiQueryOptions> {
  validateRequestOptions(deepLinkOptions: DeepLinkApiQueryOptions): void {
    const { w_id, c_id, subid, subid1, subid2, subid3, subid4, urls } = deepLinkOptions as DeepLinkApiQueryOptions;

    // Check if w_id and c_id exists
    if (!w_id || !c_id) {
      throw new Error('Invalid w_id or c_id: they should exist');
    }

    // Check if ulp exists and its length is not more than 200
    if (!urls || urls.length > 200) {
      throw new Error('Invalid ulp: it should exist and its length should not be more than 200');
    }

    // Check if any subid exists and its length is not more than 50
    const subids = { subid, subid1, subid2, subid3, subid4 };

    Object.entries(subids).forEach(([key, value]) => {
      // Check if subid is not more than 120
      if (key === 'subid4' && value && value.length > 120) {
        throw new Error('Invalid subid4: its length should not be more than 120');
      }

      if (value && value.length > 50) {
        throw new Error(`Invalid ${key}: if it exists, its length should not be more than 50`);
      }

      // Check if any of them use %00 in value
      if (value && value.includes('%00')) {
        throw new Error(`Invalid ${key}: the value should not include %00`);
      }
    });
  }

  createRequestUrl(deepLinkOptions: DeepLinkApiQueryOptions): string {
    this.validateRequestOptions(deepLinkOptions);

    const { w_id, c_id, subid, subid1, subid2, subid3, subid4, urls } = deepLinkOptions;

    const queryParams = stringify(
      {
        subid,
        subid1,
        subid2,
        subid3,
        subid4,
        ulp: urls,
      },
      { arrayFormat: 'repeat' },
    );

    return `deeplink/${w_id}/advcampaign/${c_id}/?${queryParams}`;
  }
}
