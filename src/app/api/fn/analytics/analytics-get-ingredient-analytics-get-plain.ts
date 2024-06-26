/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetIngredientAnalysis } from '../../models/get-ingredient-analysis';

export interface AnalyticsGetIngredientAnalyticsGet$Plain$Params {
}

export function analyticsGetIngredientAnalyticsGet$Plain(http: HttpClient, rootUrl: string, params?: AnalyticsGetIngredientAnalyticsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetIngredientAnalysis>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetIngredientAnalyticsGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetIngredientAnalysis>>;
    })
  );
}

analyticsGetIngredientAnalyticsGet$Plain.PATH = '/Analytics/GetIngredientAnalytics';
