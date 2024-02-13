/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateSubscriptionDayDataRequest } from '../../models/create-subscription-day-data-request';

export interface SubscriptionDayDataPost$Plain$Params {
      body?: CreateSubscriptionDayDataRequest
}

export function subscriptionDayDataPost$Plain(http: HttpClient, rootUrl: string, params?: SubscriptionDayDataPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, subscriptionDayDataPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

subscriptionDayDataPost$Plain.PATH = '/SubscriptionDayData';
