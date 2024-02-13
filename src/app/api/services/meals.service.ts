/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { GetMealRequest } from '../models/get-meal-request';
import { mealsGet } from '../fn/meals/meals-get';
import { MealsGet$Params } from '../fn/meals/meals-get';
import { mealsGet$Plain } from '../fn/meals/meals-get-plain';
import { MealsGet$Plain$Params } from '../fn/meals/meals-get-plain';
import { mealsMealIdGet } from '../fn/meals/meals-meal-id-get';
import { MealsMealIdGet$Params } from '../fn/meals/meals-meal-id-get';
import { mealsMealIdGet$Plain } from '../fn/meals/meals-meal-id-get-plain';
import { MealsMealIdGet$Plain$Params } from '../fn/meals/meals-meal-id-get-plain';
import { mealsPost } from '../fn/meals/meals-post';
import { MealsPost$Params } from '../fn/meals/meals-post';
import { mealsPost$Plain } from '../fn/meals/meals-post-plain';
import { MealsPost$Plain$Params } from '../fn/meals/meals-post-plain';
import { mealsPut } from '../fn/meals/meals-put';
import { MealsPut$Params } from '../fn/meals/meals-put';

@Injectable({ providedIn: 'root' })
export class MealsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `mealsGet()` */
  static readonly MealsGetPath = '/Meals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealsGet$Plain$Response(params?: MealsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealRequest>>> {
    return mealsGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealsGet$Plain(params?: MealsGet$Plain$Params, context?: HttpContext): Observable<Array<GetMealRequest>> {
    return this.mealsGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetMealRequest>>): Array<GetMealRequest> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealsGet$Response(params?: MealsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealRequest>>> {
    return mealsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealsGet(params?: MealsGet$Params, context?: HttpContext): Observable<Array<GetMealRequest>> {
    return this.mealsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetMealRequest>>): Array<GetMealRequest> => r.body)
    );
  }

  /** Path part for operation `mealsPut()` */
  static readonly MealsPutPath = '/Meals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealsPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealsPut$Response(params?: MealsPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return mealsPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealsPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealsPut(params?: MealsPut$Params, context?: HttpContext): Observable<void> {
    return this.mealsPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `mealsPost()` */
  static readonly MealsPostPath = '/Meals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealsPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  mealsPost$Plain$Response(params?: MealsPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return mealsPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealsPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  mealsPost$Plain(params?: MealsPost$Plain$Params, context?: HttpContext): Observable<string> {
    return this.mealsPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealsPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  mealsPost$Response(params?: MealsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return mealsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealsPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  mealsPost(params?: MealsPost$Params, context?: HttpContext): Observable<string> {
    return this.mealsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `mealsMealIdGet()` */
  static readonly MealsMealIdGetPath = '/Meals/{MealID}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealsMealIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealsMealIdGet$Plain$Response(params: MealsMealIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetMealRequest>> {
    return mealsMealIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealsMealIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealsMealIdGet$Plain(params: MealsMealIdGet$Plain$Params, context?: HttpContext): Observable<GetMealRequest> {
    return this.mealsMealIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetMealRequest>): GetMealRequest => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealsMealIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealsMealIdGet$Response(params: MealsMealIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetMealRequest>> {
    return mealsMealIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealsMealIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealsMealIdGet(params: MealsMealIdGet$Params, context?: HttpContext): Observable<GetMealRequest> {
    return this.mealsMealIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetMealRequest>): GetMealRequest => r.body)
    );
  }

}
