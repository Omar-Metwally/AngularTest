/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetCustomerAnalsis } from '../../models/get-customer-analsis';

export interface AnalyticsGetCustomerAnalsisGet$Plain$Params {
}

export function analyticsGetCustomerAnalsisGet$Plain(http: HttpClient, rootUrl: string, params?: AnalyticsGetCustomerAnalsisGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetCustomerAnalsis>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetCustomerAnalsisGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetCustomerAnalsis>>;
    })
  );
}

analyticsGetCustomerAnalsisGet$Plain.PATH = '/Analytics/GetCustomerAnalsis';
