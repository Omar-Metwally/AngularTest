/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetChartData } from '../../models/get-chart-data';

export interface AnalyticsGetMealChartDataGet$Plain$Params {
  MealOptionID?: string;
}

export function analyticsGetMealChartDataGet$Plain(http: HttpClient, rootUrl: string, params?: AnalyticsGetMealChartDataGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetMealChartDataGet$Plain.PATH, 'get');
  if (params) {
    rb.query('MealOptionID', params.MealOptionID, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetChartData>>;
    })
  );
}

analyticsGetMealChartDataGet$Plain.PATH = '/Analytics/GetMealChartData';
