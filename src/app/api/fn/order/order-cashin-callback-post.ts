/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CashInCallback } from '../../models/cash-in-callback';

export interface OrderCashinCallbackPost$Params {
  hmac?: string;
      body?: CashInCallback
}

export function orderCashinCallbackPost(http: HttpClient, rootUrl: string, params?: OrderCashinCallbackPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, orderCashinCallbackPost.PATH, 'post');
  if (params) {
    rb.query('hmac', params.hmac, {});
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

orderCashinCallbackPost.PATH = '/Order/cashin-callback';
