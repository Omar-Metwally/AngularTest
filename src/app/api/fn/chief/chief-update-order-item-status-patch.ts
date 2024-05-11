/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderStatus } from '../../models/order-status';

export interface ChiefUpdateOrderItemStatusPatch$Params {
  OrderItemID?: number;
  OrderItemUpdate?: OrderStatus;
}

export function chiefUpdateOrderItemStatusPatch(http: HttpClient, rootUrl: string, params?: ChiefUpdateOrderItemStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, chiefUpdateOrderItemStatusPatch.PATH, 'patch');
  if (params) {
    rb.query('OrderItemID', params.OrderItemID, {});
    rb.query('OrderItemUpdate', params.OrderItemUpdate, {});
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

chiefUpdateOrderItemStatusPatch.PATH = '/Chief/UpdateOrderItemStatus';
