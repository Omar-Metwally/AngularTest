/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetMealAnalysis } from '../../models/get-meal-analysis';

export interface AnalyticsGetMealAnalyticsGet$Params {
}

export function analyticsGetMealAnalyticsGet(http: HttpClient, rootUrl: string, params?: AnalyticsGetMealAnalyticsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealAnalysis>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetMealAnalyticsGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetMealAnalysis>>;
    })
  );
}

analyticsGetMealAnalyticsGet.PATH = '/Analytics/GetMealAnalytics';
