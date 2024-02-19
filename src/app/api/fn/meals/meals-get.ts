/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetMealRequest } from '../../models/get-meal-request';
import { MealSizeOption } from '../../models/meal-size-option';
import { SortBy } from '../../models/sort-by';

export interface MealsGet$Params {
  TagFilter?: Array<string>;
  SizeFilter?: Array<MealSizeOption>;
  SortBy?: SortBy;
  ChiefFilter?: Array<string>;
  StartPrice?: number;
  EndPrice?: number;
  PageSize?: number;
  PageNumber?: number;
}

export function mealsGet(http: HttpClient, rootUrl: string, params?: MealsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealRequest>>> {
  const rb = new RequestBuilder(rootUrl, mealsGet.PATH, 'get');
  if (params) {
    rb.query('TagFilter', params.TagFilter, {});
    rb.query('SizeFilter', params.SizeFilter, {});
    rb.query('SortBy', params.SortBy, {});
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
      return r as StrictHttpResponse<Array<GetMealRequest>>;
    })
  );
}

mealsGet.PATH = '/Meals';
