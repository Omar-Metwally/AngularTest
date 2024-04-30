/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetIngredientAnalysis } from '../../models/get-ingredient-analysis';

export interface AnalyticsGetIngredientAnalysisGet$Params {
}

export function analyticsGetIngredientAnalysisGet(http: HttpClient, rootUrl: string, params?: AnalyticsGetIngredientAnalysisGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetIngredientAnalysis>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetIngredientAnalysisGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetIngredientAnalysis>>;
    })
  );
}

analyticsGetIngredientAnalysisGet.PATH = '/Analytics/GetIngredientAnalysis';