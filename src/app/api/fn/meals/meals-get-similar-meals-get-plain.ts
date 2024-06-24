/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetMealRequest } from '../../models/get-meal-request';

export interface MealsGetSimilarMealsGet$Plain$Params {
  MealID?: string;
}

export function mealsGetSimilarMealsGet$Plain(http: HttpClient, rootUrl: string, params?: MealsGetSimilarMealsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealRequest>>> {
  const rb = new RequestBuilder(rootUrl, mealsGetSimilarMealsGet$Plain.PATH, 'get');
  if (params) {
    rb.query('MealID', params.MealID, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetMealRequest>>;
    })
  );
}

mealsGetSimilarMealsGet$Plain.PATH = '/Meals/GetSimilarMeals';
