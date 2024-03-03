/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AddMealSideDish } from '../../models/add-meal-side-dish';
import { MealSizeOption } from '../../models/meal-size-option';

export interface MealOptionPost$Plain$Params {
      body?: {
'MealID'?: string;
'MealSizeOption'?: MealSizeOption;
'IsAvailable'?: boolean;
'Price'?: number;
'AvailableQuantity'?: number;
'SaveQuantitySetting'?: boolean;
'Image'?: Blob;
'MealSideDishes'?: Array<AddMealSideDish>;
}
}

export function mealOptionPost$Plain(http: HttpClient, rootUrl: string, params?: MealOptionPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, mealOptionPost$Plain.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

mealOptionPost$Plain.PATH = '/MealOption';
