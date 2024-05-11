/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetCustomerAnalsis } from '../../models/get-customer-analsis';

export interface AnalyticsGetCustomerAnalyticsGet$Plain$Params {
}

export function analyticsGetCustomerAnalyticsGet$Plain(http: HttpClient, rootUrl: string, params?: AnalyticsGetCustomerAnalyticsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetCustomerAnalsis>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetCustomerAnalyticsGet$Plain.PATH, 'get');
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

analyticsGetCustomerAnalyticsGet$Plain.PATH = '/Analytics/GetCustomerAnalytics';
