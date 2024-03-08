/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CashInPaymentKeyResponse } from '../../models/cash-in-payment-key-response';
import { CreateOrderRequest } from '../../models/create-order-request';

export interface OrderPost$Plain$Params {
      body?: CreateOrderRequest
}

export function orderPost$Plain(http: HttpClient, rootUrl: string, params?: OrderPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CashInPaymentKeyResponse>> {
  const rb = new RequestBuilder(rootUrl, orderPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CashInPaymentKeyResponse>;
    })
  );
}

orderPost$Plain.PATH = '/Order';
