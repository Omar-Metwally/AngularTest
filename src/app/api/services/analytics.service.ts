/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { analyticsGetChiefAnalyticsGet } from '../fn/analytics/analytics-get-chief-analytics-get';
import { AnalyticsGetChiefAnalyticsGet$Params } from '../fn/analytics/analytics-get-chief-analytics-get';
import { analyticsGetChiefAnalyticsGet$Plain } from '../fn/analytics/analytics-get-chief-analytics-get-plain';
import { AnalyticsGetChiefAnalyticsGet$Plain$Params } from '../fn/analytics/analytics-get-chief-analytics-get-plain';
import { analyticsGetCustomerAnalyticsGet } from '../fn/analytics/analytics-get-customer-analytics-get';
import { AnalyticsGetCustomerAnalyticsGet$Params } from '../fn/analytics/analytics-get-customer-analytics-get';
import { analyticsGetCustomerAnalyticsGet$Plain } from '../fn/analytics/analytics-get-customer-analytics-get-plain';
import { AnalyticsGetCustomerAnalyticsGet$Plain$Params } from '../fn/analytics/analytics-get-customer-analytics-get-plain';
import { analyticsGetIngredientAnalyticsGet } from '../fn/analytics/analytics-get-ingredient-analytics-get';
import { AnalyticsGetIngredientAnalyticsGet$Params } from '../fn/analytics/analytics-get-ingredient-analytics-get';
import { analyticsGetIngredientAnalyticsGet$Plain } from '../fn/analytics/analytics-get-ingredient-analytics-get-plain';
import { AnalyticsGetIngredientAnalyticsGet$Plain$Params } from '../fn/analytics/analytics-get-ingredient-analytics-get-plain';
import { analyticsGetMealAnalyticsGet } from '../fn/analytics/analytics-get-meal-analytics-get';
import { AnalyticsGetMealAnalyticsGet$Params } from '../fn/analytics/analytics-get-meal-analytics-get';
import { analyticsGetMealAnalyticsGet$Plain } from '../fn/analytics/analytics-get-meal-analytics-get-plain';
import { AnalyticsGetMealAnalyticsGet$Plain$Params } from '../fn/analytics/analytics-get-meal-analytics-get-plain';
import { GetChiefAnalyticsRequest } from '../models/get-chief-analytics-request';
import { GetCustomerAnalsis } from '../models/get-customer-analsis';
import { GetIngredientAnalysis } from '../models/get-ingredient-analysis';
import { GetMealAnalysis } from '../models/get-meal-analysis';

@Injectable({ providedIn: 'root' })
export class AnalyticsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `analyticsGetMealAnalyticsGet()` */
  static readonly AnalyticsGetMealAnalyticsGetPath = '/Analytics/GetMealAnalytics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetMealAnalyticsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetMealAnalyticsGet$Plain$Response(params?: AnalyticsGetMealAnalyticsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealAnalysis>>> {
    return analyticsGetMealAnalyticsGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetMealAnalyticsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetMealAnalyticsGet$Plain(params?: AnalyticsGetMealAnalyticsGet$Plain$Params, context?: HttpContext): Observable<Array<GetMealAnalysis>> {
    return this.analyticsGetMealAnalyticsGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetMealAnalysis>>): Array<GetMealAnalysis> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetMealAnalyticsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetMealAnalyticsGet$Response(params?: AnalyticsGetMealAnalyticsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetMealAnalysis>>> {
    return analyticsGetMealAnalyticsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetMealAnalyticsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetMealAnalyticsGet(params?: AnalyticsGetMealAnalyticsGet$Params, context?: HttpContext): Observable<Array<GetMealAnalysis>> {
    return this.analyticsGetMealAnalyticsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetMealAnalysis>>): Array<GetMealAnalysis> => r.body)
    );
  }

  /** Path part for operation `analyticsGetIngredientAnalyticsGet()` */
  static readonly AnalyticsGetIngredientAnalyticsGetPath = '/Analytics/GetIngredientAnalytics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetIngredientAnalyticsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientAnalyticsGet$Plain$Response(params?: AnalyticsGetIngredientAnalyticsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetIngredientAnalysis>>> {
    return analyticsGetIngredientAnalyticsGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetIngredientAnalyticsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientAnalyticsGet$Plain(params?: AnalyticsGetIngredientAnalyticsGet$Plain$Params, context?: HttpContext): Observable<Array<GetIngredientAnalysis>> {
    return this.analyticsGetIngredientAnalyticsGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetIngredientAnalysis>>): Array<GetIngredientAnalysis> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetIngredientAnalyticsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientAnalyticsGet$Response(params?: AnalyticsGetIngredientAnalyticsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetIngredientAnalysis>>> {
    return analyticsGetIngredientAnalyticsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetIngredientAnalyticsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientAnalyticsGet(params?: AnalyticsGetIngredientAnalyticsGet$Params, context?: HttpContext): Observable<Array<GetIngredientAnalysis>> {
    return this.analyticsGetIngredientAnalyticsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetIngredientAnalysis>>): Array<GetIngredientAnalysis> => r.body)
    );
  }

  /** Path part for operation `analyticsGetCustomerAnalyticsGet()` */
  static readonly AnalyticsGetCustomerAnalyticsGetPath = '/Analytics/GetCustomerAnalytics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetCustomerAnalyticsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerAnalyticsGet$Plain$Response(params?: AnalyticsGetCustomerAnalyticsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetCustomerAnalsis>>> {
    return analyticsGetCustomerAnalyticsGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetCustomerAnalyticsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerAnalyticsGet$Plain(params?: AnalyticsGetCustomerAnalyticsGet$Plain$Params, context?: HttpContext): Observable<Array<GetCustomerAnalsis>> {
    return this.analyticsGetCustomerAnalyticsGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetCustomerAnalsis>>): Array<GetCustomerAnalsis> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetCustomerAnalyticsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerAnalyticsGet$Response(params?: AnalyticsGetCustomerAnalyticsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetCustomerAnalsis>>> {
    return analyticsGetCustomerAnalyticsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetCustomerAnalyticsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerAnalyticsGet(params?: AnalyticsGetCustomerAnalyticsGet$Params, context?: HttpContext): Observable<Array<GetCustomerAnalsis>> {
    return this.analyticsGetCustomerAnalyticsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetCustomerAnalsis>>): Array<GetCustomerAnalsis> => r.body)
    );
  }

  /** Path part for operation `analyticsGetChiefAnalyticsGet()` */
  static readonly AnalyticsGetChiefAnalyticsGetPath = '/Analytics/GetChiefAnalytics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetChiefAnalyticsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetChiefAnalyticsGet$Plain$Response(params?: AnalyticsGetChiefAnalyticsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChiefAnalyticsRequest>>> {
    return analyticsGetChiefAnalyticsGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetChiefAnalyticsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetChiefAnalyticsGet$Plain(params?: AnalyticsGetChiefAnalyticsGet$Plain$Params, context?: HttpContext): Observable<Array<GetChiefAnalyticsRequest>> {
    return this.analyticsGetChiefAnalyticsGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChiefAnalyticsRequest>>): Array<GetChiefAnalyticsRequest> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetChiefAnalyticsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetChiefAnalyticsGet$Response(params?: AnalyticsGetChiefAnalyticsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChiefAnalyticsRequest>>> {
    return analyticsGetChiefAnalyticsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetChiefAnalyticsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetChiefAnalyticsGet(params?: AnalyticsGetChiefAnalyticsGet$Params, context?: HttpContext): Observable<Array<GetChiefAnalyticsRequest>> {
    return this.analyticsGetChiefAnalyticsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChiefAnalyticsRequest>>): Array<GetChiefAnalyticsRequest> => r.body)
    );
  }

}
