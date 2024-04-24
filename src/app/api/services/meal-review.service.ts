/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { GetMealReviewRequest } from '../models/get-meal-review-request';
import { GetMealReviewsRequest } from '../models/get-meal-reviews-request';
import { mealReviewDelete } from '../fn/meal-review/meal-review-delete';
import { MealReviewDelete$Params } from '../fn/meal-review/meal-review-delete';
import { mealReviewGet } from '../fn/meal-review/meal-review-get';
import { MealReviewGet$Params } from '../fn/meal-review/meal-review-get';
import { mealReviewGet$Plain } from '../fn/meal-review/meal-review-get-plain';
import { MealReviewGet$Plain$Params } from '../fn/meal-review/meal-review-get-plain';
import { mealReviewGetMealReviewGet } from '../fn/meal-review/meal-review-get-meal-review-get';
import { MealReviewGetMealReviewGet$Params } from '../fn/meal-review/meal-review-get-meal-review-get';
import { mealReviewGetMealReviewGet$Plain } from '../fn/meal-review/meal-review-get-meal-review-get-plain';
import { MealReviewGetMealReviewGet$Plain$Params } from '../fn/meal-review/meal-review-get-meal-review-get-plain';
import { mealReviewPost } from '../fn/meal-review/meal-review-post';
import { MealReviewPost$Params } from '../fn/meal-review/meal-review-post';
import { mealReviewPut } from '../fn/meal-review/meal-review-put';
import { MealReviewPut$Params } from '../fn/meal-review/meal-review-put';

@Injectable({ providedIn: 'root' })
export class MealReviewService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `mealReviewGet()` */
  static readonly MealReviewGetPath = '/MealReview';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealReviewGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealReviewGet$Plain$Response(params?: MealReviewGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealReviewRequest>>> {
    return mealReviewGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealReviewGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealReviewGet$Plain(params?: MealReviewGet$Plain$Params, context?: HttpContext): Observable<Array<GetMealReviewRequest>> {
    return this.mealReviewGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetMealReviewRequest>>): Array<GetMealReviewRequest> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealReviewGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealReviewGet$Response(params?: MealReviewGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealReviewRequest>>> {
    return mealReviewGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealReviewGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealReviewGet(params?: MealReviewGet$Params, context?: HttpContext): Observable<Array<GetMealReviewRequest>> {
    return this.mealReviewGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetMealReviewRequest>>): Array<GetMealReviewRequest> => r.body)
    );
  }

  /** Path part for operation `mealReviewPut()` */
  static readonly MealReviewPutPath = '/MealReview';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealReviewPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealReviewPut$Response(params?: MealReviewPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return mealReviewPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealReviewPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealReviewPut(params?: MealReviewPut$Params, context?: HttpContext): Observable<void> {
    return this.mealReviewPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `mealReviewPost()` */
  static readonly MealReviewPostPath = '/MealReview';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealReviewPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealReviewPost$Response(params?: MealReviewPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return mealReviewPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealReviewPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mealReviewPost(params?: MealReviewPost$Params, context?: HttpContext): Observable<void> {
    return this.mealReviewPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `mealReviewDelete()` */
  static readonly MealReviewDeletePath = '/MealReview';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealReviewDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealReviewDelete$Response(params?: MealReviewDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return mealReviewDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealReviewDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealReviewDelete(params?: MealReviewDelete$Params, context?: HttpContext): Observable<void> {
    return this.mealReviewDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `mealReviewGetMealReviewGet()` */
  static readonly MealReviewGetMealReviewGetPath = '/MealReview/GetMealReview';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealReviewGetMealReviewGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealReviewGetMealReviewGet$Plain$Response(params?: MealReviewGetMealReviewGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetMealReviewsRequest>> {
    return mealReviewGetMealReviewGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealReviewGetMealReviewGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealReviewGetMealReviewGet$Plain(params?: MealReviewGetMealReviewGet$Plain$Params, context?: HttpContext): Observable<GetMealReviewsRequest> {
    return this.mealReviewGetMealReviewGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetMealReviewsRequest>): GetMealReviewsRequest => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mealReviewGetMealReviewGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealReviewGetMealReviewGet$Response(params?: MealReviewGetMealReviewGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetMealReviewsRequest>> {
    return mealReviewGetMealReviewGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mealReviewGetMealReviewGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mealReviewGetMealReviewGet(params?: MealReviewGetMealReviewGet$Params, context?: HttpContext): Observable<GetMealReviewsRequest> {
    return this.mealReviewGetMealReviewGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetMealReviewsRequest>): GetMealReviewsRequest => r.body)
    );
  }

}
