/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetChartData } from '../../models/get-chart-data';

export interface AnalyticsGetCustomerChartDataGet$Params {
  CustomerID?: string;
}

export function analyticsGetCustomerChartDataGet(http: HttpClient, rootUrl: string, params?: AnalyticsGetCustomerChartDataGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetCustomerChartDataGet.PATH, 'get');
  if (params) {
    rb.query('CustomerID', params.CustomerID, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetChartData>>;
    })
  );
}

analyticsGetCustomerChartDataGet.PATH = '/Analytics/GetCustomerChartData';
