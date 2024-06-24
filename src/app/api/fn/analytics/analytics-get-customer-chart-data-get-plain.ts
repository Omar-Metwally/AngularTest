/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetChartData } from '../../models/get-chart-data';

export interface AnalyticsGetCustomerChartDataGet$Plain$Params {
  CustomerID?: string;
}

export function analyticsGetCustomerChartDataGet$Plain(http: HttpClient, rootUrl: string, params?: AnalyticsGetCustomerChartDataGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetCustomerChartDataGet$Plain.PATH, 'get');
  if (params) {
    rb.query('CustomerID', params.CustomerID, {});
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

analyticsGetCustomerChartDataGet$Plain.PATH = '/Analytics/GetCustomerChartData';
