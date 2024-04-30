/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetMealAnalysis } from '../../models/get-meal-analysis';

export interface AnalyticsGetMealAnalyticsGet$Plain$Params {
}

export function analyticsGetMealAnalyticsGet$Plain(http: HttpClient, rootUrl: string, params?: AnalyticsGetMealAnalyticsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealAnalysis>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetMealAnalyticsGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetMealAnalysis>>;
    })
  );
}

analyticsGetMealAnalyticsGet$Plain.PATH = '/Analytics/GetMealAnalytics';
