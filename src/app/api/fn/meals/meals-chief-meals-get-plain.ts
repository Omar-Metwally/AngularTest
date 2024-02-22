/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetMealTableRequest } from '../../models/get-meal-table-request';
import { MealCategory } from '../../models/meal-category';
import { MealSizeOption } from '../../models/meal-size-option';
import { MealSpiceLevel } from '../../models/meal-spice-level';
import { SortBy } from '../../models/sort-by';

export interface MealsChiefMealsGet$Plain$Params {
  TagFilter?: Array<string>;
  SizeFilter?: Array<MealSizeOption>;
  SortBy?: SortBy;
  MealSpiceLevel?: MealSpiceLevel;
  MealCategory?: MealCategory;
  ChiefFilter?: Array<string>;
  StartPrice?: number;
  EndPrice?: number;
  PageSize?: number;
  PageNumber?: number;
}

export function mealsChiefMealsGet$Plain(http: HttpClient, rootUrl: string, params?: MealsChiefMealsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealTableRequest>>> {
  const rb = new RequestBuilder(rootUrl, mealsChiefMealsGet$Plain.PATH, 'get');
  if (params) {
    rb.query('TagFilter', params.TagFilter, {});
    rb.query('SizeFilter', params.SizeFilter, {});
    rb.query('SortBy', params.SortBy, {});
    rb.query('MealSpiceLevel', params.MealSpiceLevel, {});
    rb.query('MealCategory', params.MealCategory, {});
    rb.query('ChiefFilter', params.ChiefFilter, {});
    rb.query('StartPrice', params.StartPrice, {});
    rb.query('EndPrice', params.EndPrice, {});
    rb.query('PageSize', params.PageSize, {});
    rb.query('PageNumber', params.PageNumber, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetMealTableRequest>>;
    })
  );
}

mealsChiefMealsGet$Plain.PATH = '/Meals/ChiefMeals';
