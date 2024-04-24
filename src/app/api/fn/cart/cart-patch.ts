/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetCartRequest } from '../../models/get-cart-request';

export interface CartPatch$Params {
  cartItemID?: number;
  amount?: number;
}

export function cartPatch(http: HttpClient, rootUrl: string, params?: CartPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<GetCartRequest>> {
  const rb = new RequestBuilder(rootUrl, cartPatch.PATH, 'patch');
  if (params) {
    rb.query('cartItemID', params.cartItemID, {});
    rb.query('amount', params.amount, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetCartRequest>;
    })
  );
}

cartPatch.PATH = '/Cart';
