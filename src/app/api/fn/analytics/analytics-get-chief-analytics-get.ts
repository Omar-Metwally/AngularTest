/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetChiefAnalyticsRequest } from '../../models/get-chief-analytics-request';

export interface AnalyticsGetChiefAnalyticsGet$Params {
}

export function analyticsGetChiefAnalyticsGet(http: HttpClient, rootUrl: string, params?: AnalyticsGetChiefAnalyticsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChiefAnalyticsRequest>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetChiefAnalyticsGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetChiefAnalyticsRequest>>;
    })
  );
}

analyticsGetChiefAnalyticsGet.PATH = '/Analytics/GetChiefAnalytics';
