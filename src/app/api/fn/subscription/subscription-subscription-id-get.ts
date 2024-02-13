/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetSubscriptionRequest } from '../../models/get-subscription-request';

export interface SubscriptionSubscriptionIdGet$Params {
  SubscriptionID: string;
}

export function subscriptionSubscriptionIdGet(http: HttpClient, rootUrl: string, params: SubscriptionSubscriptionIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetSubscriptionRequest>> {
  const rb = new RequestBuilder(rootUrl, subscriptionSubscriptionIdGet.PATH, 'get');
  if (params) {
    rb.path('SubscriptionID', params.SubscriptionID, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetSubscriptionRequest>;
    })
  );
}

subscriptionSubscriptionIdGet.PATH = '/Subscription/{SubscriptionID}';
