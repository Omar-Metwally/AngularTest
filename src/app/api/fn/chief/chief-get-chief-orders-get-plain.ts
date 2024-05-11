/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetOrderItem } from '../../models/get-order-item';

export interface ChiefGetChiefOrdersGet$Plain$Params {
}

export function chiefGetChiefOrdersGet$Plain(http: HttpClient, rootUrl: string, params?: ChiefGetChiefOrdersGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetOrderItem>>> {
  const rb = new RequestBuilder(rootUrl, chiefGetChiefOrdersGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetOrderItem>>;
    })
  );
}

chiefGetChiefOrdersGet$Plain.PATH = '/Chief/GetChiefOrders';
