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
import { MealStyle } from '../../models/meal-style';
import { MealTag } from '../../models/meal-tag';
import { SortBy } from '../../models/sort-by';

export interface MealsChiefMealsGet$Params {
  TagFilter?: Array<MealTag>;
  SizeFilter?: Array<MealSizeOption>;
  SortBy?: SortBy;
  MealSpiceLevel?: Array<MealSpiceLevel>;
  MealCategory?: Array<MealCategory>;
  MealStyle?: Array<MealStyle>;
  ChiefFilter?: Array<string>;
  StartPrice?: number;
  EndPrice?: number;
  PageSize?: number;
  PageNumber?: number;
}

export function mealsChiefMealsGet(http: HttpClient, rootUrl: string, params?: MealsChiefMealsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealTableRequest>>> {
  const rb = new RequestBuilder(rootUrl, mealsChiefMealsGet.PATH, 'get');
  if (params) {
    rb.query('TagFilter', params.TagFilter, {});
    rb.query('SizeFilter', params.SizeFilter, {});
    rb.query('SortBy', params.SortBy, {});
    rb.query('MealSpiceLevel', params.MealSpiceLevel, {});
    rb.query('MealCategory', params.MealCategory, {});
    rb.query('MealStyle', params.MealStyle, {});
    rb.query('ChiefFilter', params.ChiefFilter, {});
    rb.query('StartPrice', params.StartPrice, {});
    rb.query('EndPrice', params.EndPrice, {});
    rb.query('PageSize', params.PageSize, {});
    rb.query('PageNumber', params.PageNumber, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetMealTableRequest>>;
    })
  );
}

mealsChiefMealsGet.PATH = '/Meals/ChiefMeals';
