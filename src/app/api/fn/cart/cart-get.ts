/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Cart } from '../../models/cart';

export interface CartGet$Params {
}

export function cartGet(http: HttpClient, rootUrl: string, params?: CartGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Cart>>> {
  const rb = new RequestBuilder(rootUrl, cartGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Cart>>;
    })
  );
}

cartGet.PATH = '/Cart';
