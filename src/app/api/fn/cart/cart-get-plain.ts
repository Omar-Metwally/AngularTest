/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetCartRequest } from '../../models/get-cart-request';

export interface CartGet$Plain$Params {
}

export function cartGet$Plain(http: HttpClient, rootUrl: string, params?: CartGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetCartRequest>> {
  const rb = new RequestBuilder(rootUrl, cartGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetCartRequest>;
    })
  );
}

cartGet$Plain.PATH = '/Cart';
