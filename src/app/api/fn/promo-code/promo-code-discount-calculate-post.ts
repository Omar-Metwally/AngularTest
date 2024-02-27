/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DiscountCalculateRequest } from '../../models/discount-calculate-request';
import { GetSubscriptionRequest } from '../../models/get-subscription-request';

export interface PromoCodeDiscountCalculatePost$Params {
      body?: DiscountCalculateRequest
}

export function promoCodeDiscountCalculatePost(http: HttpClient, rootUrl: string, params?: PromoCodeDiscountCalculatePost$Params, context?: HttpContext): Observable<StrictHttpResponse<GetSubscriptionRequest>> {
  const rb = new RequestBuilder(rootUrl, promoCodeDiscountCalculatePost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
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

promoCodeDiscountCalculatePost.PATH = '/PromoCode/DiscountCalculate';
