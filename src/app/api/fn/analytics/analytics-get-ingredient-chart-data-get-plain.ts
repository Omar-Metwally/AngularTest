/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FoodIngredient } from '../../models/food-ingredient';
import { GetChartData } from '../../models/get-chart-data';

export interface AnalyticsGetIngredientChartDataGet$Plain$Params {
  ingredient?: FoodIngredient;
}

export function analyticsGetIngredientChartDataGet$Plain(http: HttpClient, rootUrl: string, params?: AnalyticsGetIngredientChartDataGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
  const rb = new RequestBuilder(rootUrl, analyticsGetIngredientChartDataGet$Plain.PATH, 'get');
  if (params) {
    rb.query('ingredient', params.ingredient, {});
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

analyticsGetIngredientChartDataGet$Plain.PATH = '/Analytics/GetIngredientChartData';
