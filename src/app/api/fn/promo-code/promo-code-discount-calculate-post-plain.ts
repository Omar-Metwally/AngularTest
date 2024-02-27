/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DiscountCalculateRequest } from '../../models/discount-calculate-request';
import { GetSubscriptionRequest } from '../../models/get-subscription-request';

export interface PromoCodeDiscountCalculatePost$Plain$Params {
      body?: DiscountCalculateRequest
}

export function promoCodeDiscountCalculatePost$Plain(http: HttpClient, rootUrl: string, params?: PromoCodeDiscountCalculatePost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetSubscriptionRequest>> {
  const rb = new RequestBuilder(rootUrl, promoCodeDiscountCalculatePost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetSubscriptionRequest>;
    })
  );
}

promoCodeDiscountCalculatePost$Plain.PATH = '/PromoCode/DiscountCalculate';
