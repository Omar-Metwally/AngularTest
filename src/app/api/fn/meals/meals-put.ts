/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MealCategory } from '../../models/meal-category';
import { MealSpiceLevel } from '../../models/meal-spice-level';
import { MealStyle } from '../../models/meal-style';
import { MealTag } from '../../models/meal-tag';

export interface MealsPut$Params {
      body?: {
'MealID'?: string;
'Name'?: string;
'Description'?: string;
'MealSpiceLevel'?: MealSpiceLevel;
'MealCategory'?: MealCategory;
'MealStyle'?: MealStyle;
'TagsID'?: Array<MealTag>;
'Image'?: Blob;
}
}

export function mealsPut(http: HttpClient, rootUrl: string, params?: MealsPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, mealsPut.PATH, 'put');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

mealsPut.PATH = '/Meals';
