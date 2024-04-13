/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetCartMealRequest } from '../../models/get-cart-meal-request';

export interface MealsMealOptionCartPost$Plain$Params {
      body?: Array<string>
}

export function mealsMealOptionCartPost$Plain(http: HttpClient, rootUrl: string, params?: MealsMealOptionCartPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetCartMealRequest>>> {
  const rb = new RequestBuilder(rootUrl, mealsMealOptionCartPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetCartMealRequest>>;
    })
  );
}

mealsMealOptionCartPost$Plain.PATH = '/Meals/MealOptionCart';
