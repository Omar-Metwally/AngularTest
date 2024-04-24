/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetMealReviewsRequest } from '../../models/get-meal-reviews-request';

export interface MealReviewGetMealReviewGet$Params {
  MealID?: string;
}

export function mealReviewGetMealReviewGet(http: HttpClient, rootUrl: string, params?: MealReviewGetMealReviewGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetMealReviewsRequest>> {
  const rb = new RequestBuilder(rootUrl, mealReviewGetMealReviewGet.PATH, 'get');
  if (params) {
    rb.query('MealID', params.MealID, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetMealReviewsRequest>;
    })
  );
}

mealReviewGetMealReviewGet.PATH = '/MealReview/GetMealReview';
