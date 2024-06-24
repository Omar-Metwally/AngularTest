/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetChartData } from '../../models/get-chart-data';

export interface AnalyticsGetChiefChartDataGet$Plain$Params {
  ChiefID?: string;
}

export function analyticsGetChiefChartDataGet$Plain(http: HttpClient, rootUrl: string, params?: AnalyticsGetChiefChartDataGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetChiefChartDataGet$Plain.PATH, 'get');
  if (params) {
    rb.query('ChiefID', params.ChiefID, {});
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

analyticsGetChiefChartDataGet$Plain.PATH = '/Analytics/GetChiefChartData';
