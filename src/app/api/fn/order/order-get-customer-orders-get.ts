/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetOrderRequest } from '../../models/get-order-request';

export interface OrderGetCustomerOrdersGet$Params {
}

export function orderGetCustomerOrdersGet(http: HttpClient, rootUrl: string, params?: OrderGetCustomerOrdersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetOrderRequest>>> {
  const rb = new RequestBuilder(rootUrl, orderGetCustomerOrdersGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetOrderRequest>>;
    })
  );
}

orderGetCustomerOrdersGet.PATH = '/Order/GetCustomerOrders';
