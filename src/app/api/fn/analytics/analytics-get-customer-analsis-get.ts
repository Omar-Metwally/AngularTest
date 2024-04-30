/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetCustomerAnalsis } from '../../models/get-customer-analsis';

export interface AnalyticsGetCustomerAnalsisGet$Params {
}

export function analyticsGetCustomerAnalsisGet(http: HttpClient, rootUrl: string, params?: AnalyticsGetCustomerAnalsisGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetCustomerAnalsis>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetCustomerAnalsisGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetCustomerAnalsis>>;
    })
  );
}

analyticsGetCustomerAnalsisGet.PATH = '/Analytics/GetCustomerAnalsis';
