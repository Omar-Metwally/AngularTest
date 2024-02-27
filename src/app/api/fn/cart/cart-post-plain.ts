/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Cart } from '../../models/cart';
import { UpsertCartRequest } from '../../models/upsert-cart-request';

export interface CartPost$Plain$Params {
      body?: Array<UpsertCartRequest>
}

export function cartPost$Plain(http: HttpClient, rootUrl: string, params?: CartPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Cart>>> {
  const rb = new RequestBuilder(rootUrl, cartPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Cart>>;
    })
  );
}

cartPost$Plain.PATH = '/Cart';
