/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetCartMealRequest } from '../../models/get-cart-meal-request';

export interface MealsMealOptionCartPost$Params {
      body?: Array<string>
}

export function mealsMealOptionCartPost(http: HttpClient, rootUrl: string, params?: MealsMealOptionCartPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetCartMealRequest>>> {
  const rb = new RequestBuilder(rootUrl, mealsMealOptionCartPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetCartMealRequest>>;
    })
  );
}

mealsMealOptionCartPost.PATH = '/Meals/MealOptionCart';
