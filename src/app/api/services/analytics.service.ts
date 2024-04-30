/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { analyticsGetCustomerAnalsisGet } from '../fn/analytics/analytics-get-customer-analsis-get';
import { AnalyticsGetCustomerAnalsisGet$Params } from '../fn/analytics/analytics-get-customer-analsis-get';
import { analyticsGetCustomerAnalsisGet$Plain } from '../fn/analytics/analytics-get-customer-analsis-get-plain';
import { AnalyticsGetCustomerAnalsisGet$Plain$Params } from '../fn/analytics/analytics-get-customer-analsis-get-plain';
import { analyticsGetIngredientAnalysisGet } from '../fn/analytics/analytics-get-ingredient-analysis-get';
import { AnalyticsGetIngredientAnalysisGet$Params } from '../fn/analytics/analytics-get-ingredient-analysis-get';
import { analyticsGetIngredientAnalysisGet$Plain } from '../fn/analytics/analytics-get-ingredient-analysis-get-plain';
import { AnalyticsGetIngredientAnalysisGet$Plain$Params } from '../fn/analytics/analytics-get-ingredient-analysis-get-plain';
import { analyticsGetMealAnalyticsGet } from '../fn/analytics/analytics-get-meal-analytics-get';
import { AnalyticsGetMealAnalyticsGet$Params } from '../fn/analytics/analytics-get-meal-analytics-get';
import { analyticsGetMealAnalyticsGet$Plain } from '../fn/analytics/analytics-get-meal-analytics-get-plain';
import { AnalyticsGetMealAnalyticsGet$Plain$Params } from '../fn/analytics/analytics-get-meal-analytics-get-plain';
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

  /** Path part for operation `analyticsGetIngredientAnalysisGet()` */
  static readonly AnalyticsGetIngredientAnalysisGetPath = '/Analytics/GetIngredientAnalysis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetIngredientAnalysisGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientAnalysisGet$Plain$Response(params?: AnalyticsGetIngredientAnalysisGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetIngredientAnalysis>>> {
    return analyticsGetIngredientAnalysisGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetIngredientAnalysisGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientAnalysisGet$Plain(params?: AnalyticsGetIngredientAnalysisGet$Plain$Params, context?: HttpContext): Observable<Array<GetIngredientAnalysis>> {
    return this.analyticsGetIngredientAnalysisGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetIngredientAnalysis>>): Array<GetIngredientAnalysis> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetIngredientAnalysisGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientAnalysisGet$Response(params?: AnalyticsGetIngredientAnalysisGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetIngredientAnalysis>>> {
    return analyticsGetIngredientAnalysisGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetIngredientAnalysisGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientAnalysisGet(params?: AnalyticsGetIngredientAnalysisGet$Params, context?: HttpContext): Observable<Array<GetIngredientAnalysis>> {
    return this.analyticsGetIngredientAnalysisGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetIngredientAnalysis>>): Array<GetIngredientAnalysis> => r.body)
    );
  }

  /** Path part for operation `analyticsGetCustomerAnalsisGet()` */
  static readonly AnalyticsGetCustomerAnalsisGetPath = '/Analytics/GetCustomerAnalsis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetCustomerAnalsisGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerAnalsisGet$Plain$Response(params?: AnalyticsGetCustomerAnalsisGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetCustomerAnalsis>>> {
    return analyticsGetCustomerAnalsisGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetCustomerAnalsisGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerAnalsisGet$Plain(params?: AnalyticsGetCustomerAnalsisGet$Plain$Params, context?: HttpContext): Observable<Array<GetCustomerAnalsis>> {
    return this.analyticsGetCustomerAnalsisGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetCustomerAnalsis>>): Array<GetCustomerAnalsis> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetCustomerAnalsisGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerAnalsisGet$Response(params?: AnalyticsGetCustomerAnalsisGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetCustomerAnalsis>>> {
    return analyticsGetCustomerAnalsisGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetCustomerAnalsisGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerAnalsisGet(params?: AnalyticsGetCustomerAnalsisGet$Params, context?: HttpContext): Observable<Array<GetCustomerAnalsis>> {
    return this.analyticsGetCustomerAnalsisGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetCustomerAnalsis>>): Array<GetCustomerAnalsis> => r.body)
    );
  }

}
