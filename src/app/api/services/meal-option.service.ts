/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { mealOptionPost } from '../fn/meal-option/meal-option-post';
import { MealOptionPost$Params } from '../fn/meal-option/meal-option-post';
import { mealOptionPost$Plain } from '../fn/meal-option/meal-option-post-plain';
import { MealOptionPost$Plain$Params } from '../fn/meal-option/meal-option-post-plain';
import { mealOptionPut } from '../fn/meal-option/meal-option-put';
import { MealOptionPut$Params } from '../fn/meal-option/meal-option-put';

@Injectable({ providedIn: 'root' })
export class MealOptionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `mealOptionPut()` */
  static readonly MealOptionPutPath = '/MealOption';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealOptionPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealOptionPut$Response(params?: MealOptionPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return mealOptionPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealOptionPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealOptionPut(params?: MealOptionPut$Params, context?: HttpContext): Observable<void> {
    return this.mealOptionPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `mealOptionPost()` */
  static readonly MealOptionPostPath = '/MealOption';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealOptionPost$Plain()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealOptionPost$Plain$Response(params?: MealOptionPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return mealOptionPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealOptionPost$Plain$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealOptionPost$Plain(params?: MealOptionPost$Plain$Params, context?: HttpContext): Observable<string> {
    return this.mealOptionPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealOptionPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealOptionPost$Response(params?: MealOptionPost$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return mealOptionPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealOptionPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealOptionPost(params?: MealOptionPost$Params, context?: HttpContext): Observable<string> {
    return this.mealOptionPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
