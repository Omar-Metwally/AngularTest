/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetSubscriptionRequest } from '../../models/get-subscription-request';
import { UpsertPromoCodeRequest } from '../../models/upsert-promo-code-request';

export interface PromoCodeCreatePromoCodePost$Plain$Params {
      body?: UpsertPromoCodeRequest
}

export function promoCodeCreatePromoCodePost$Plain(http: HttpClient, rootUrl: string, params?: PromoCodeCreatePromoCodePost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetSubscriptionRequest>> {
  const rb = new RequestBuilder(rootUrl, promoCodeCreatePromoCodePost$Plain.PATH, 'post');
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

promoCodeCreatePromoCodePost$Plain.PATH = '/PromoCode/CreatePromoCode';
