/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetIngredientAnalysis } from '../../models/get-ingredient-analysis';

export interface AnalyticsGetIngredientAnalysisGet$Plain$Params {
}

export function analyticsGetIngredientAnalysisGet$Plain(http: HttpClient, rootUrl: string, params?: AnalyticsGetIngredientAnalysisGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetIngredientAnalysis>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetIngredientAnalysisGet$Plain.PATH, 'get');
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

analyticsGetIngredientAnalysisGet$Plain.PATH = '/Analytics/GetIngredientAnalysis';
