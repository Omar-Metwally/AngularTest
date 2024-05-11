/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetCustomerAnalsis } from '../../models/get-customer-analsis';

export interface AnalyticsGetCustomerAnalyticsGet$Params {
}

export function analyticsGetCustomerAnalyticsGet(http: HttpClient, rootUrl: string, params?: AnalyticsGetCustomerAnalyticsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetCustomerAnalsis>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetCustomerAnalyticsGet.PATH, 'get');
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

analyticsGetCustomerAnalyticsGet.PATH = '/Analytics/GetCustomerAnalytics';
