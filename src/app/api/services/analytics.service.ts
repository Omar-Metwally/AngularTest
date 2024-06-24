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
import { analyticsGetChiefChartDataGet } from '../fn/analytics/analytics-get-chief-chart-data-get';
import { AnalyticsGetChiefChartDataGet$Params } from '../fn/analytics/analytics-get-chief-chart-data-get';
import { analyticsGetChiefChartDataGet$Plain } from '../fn/analytics/analytics-get-chief-chart-data-get-plain';
import { AnalyticsGetChiefChartDataGet$Plain$Params } from '../fn/analytics/analytics-get-chief-chart-data-get-plain';
import { analyticsGetCustomerAnalyticsGet } from '../fn/analytics/analytics-get-customer-analytics-get';
import { AnalyticsGetCustomerAnalyticsGet$Params } from '../fn/analytics/analytics-get-customer-analytics-get';
import { analyticsGetCustomerAnalyticsGet$Plain } from '../fn/analytics/analytics-get-customer-analytics-get-plain';
import { AnalyticsGetCustomerAnalyticsGet$Plain$Params } from '../fn/analytics/analytics-get-customer-analytics-get-plain';
import { analyticsGetCustomerChartDataGet } from '../fn/analytics/analytics-get-customer-chart-data-get';
import { AnalyticsGetCustomerChartDataGet$Params } from '../fn/analytics/analytics-get-customer-chart-data-get';
import { analyticsGetCustomerChartDataGet$Plain } from '../fn/analytics/analytics-get-customer-chart-data-get-plain';
import { AnalyticsGetCustomerChartDataGet$Plain$Params } from '../fn/analytics/analytics-get-customer-chart-data-get-plain';
import { analyticsGetIngredientAnalyticsGet } from '../fn/analytics/analytics-get-ingredient-analytics-get';
import { AnalyticsGetIngredientAnalyticsGet$Params } from '../fn/analytics/analytics-get-ingredient-analytics-get';
import { analyticsGetIngredientAnalyticsGet$Plain } from '../fn/analytics/analytics-get-ingredient-analytics-get-plain';
import { AnalyticsGetIngredientAnalyticsGet$Plain$Params } from '../fn/analytics/analytics-get-ingredient-analytics-get-plain';
import { analyticsGetIngredientChartDataGet } from '../fn/analytics/analytics-get-ingredient-chart-data-get';
import { AnalyticsGetIngredientChartDataGet$Params } from '../fn/analytics/analytics-get-ingredient-chart-data-get';
import { analyticsGetIngredientChartDataGet$Plain } from '../fn/analytics/analytics-get-ingredient-chart-data-get-plain';
import { AnalyticsGetIngredientChartDataGet$Plain$Params } from '../fn/analytics/analytics-get-ingredient-chart-data-get-plain';
import { analyticsGetMealAnalyticsGet } from '../fn/analytics/analytics-get-meal-analytics-get';
import { AnalyticsGetMealAnalyticsGet$Params } from '../fn/analytics/analytics-get-meal-analytics-get';
import { analyticsGetMealAnalyticsGet$Plain } from '../fn/analytics/analytics-get-meal-analytics-get-plain';
import { AnalyticsGetMealAnalyticsGet$Plain$Params } from '../fn/analytics/analytics-get-meal-analytics-get-plain';
import { analyticsGetMealChartDataGet } from '../fn/analytics/analytics-get-meal-chart-data-get';
import { AnalyticsGetMealChartDataGet$Params } from '../fn/analytics/analytics-get-meal-chart-data-get';
import { analyticsGetMealChartDataGet$Plain } from '../fn/analytics/analytics-get-meal-chart-data-get-plain';
import { AnalyticsGetMealChartDataGet$Plain$Params } from '../fn/analytics/analytics-get-meal-chart-data-get-plain';
import { GetChartData } from '../models/get-chart-data';
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

  /** Path part for operation `analyticsGetMealChartDataGet()` */
  static readonly AnalyticsGetMealChartDataGetPath = '/Analytics/GetMealChartData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetMealChartDataGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetMealChartDataGet$Plain$Response(params?: AnalyticsGetMealChartDataGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
    return analyticsGetMealChartDataGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetMealChartDataGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetMealChartDataGet$Plain(params?: AnalyticsGetMealChartDataGet$Plain$Params, context?: HttpContext): Observable<Array<GetChartData>> {
    return this.analyticsGetMealChartDataGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChartData>>): Array<GetChartData> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetMealChartDataGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetMealChartDataGet$Response(params?: AnalyticsGetMealChartDataGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
    return analyticsGetMealChartDataGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetMealChartDataGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetMealChartDataGet(params?: AnalyticsGetMealChartDataGet$Params, context?: HttpContext): Observable<Array<GetChartData>> {
    return this.analyticsGetMealChartDataGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChartData>>): Array<GetChartData> => r.body)
    );
  }

  /** Path part for operation `analyticsGetCustomerChartDataGet()` */
  static readonly AnalyticsGetCustomerChartDataGetPath = '/Analytics/GetCustomerChartData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetCustomerChartDataGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerChartDataGet$Plain$Response(params?: AnalyticsGetCustomerChartDataGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
    return analyticsGetCustomerChartDataGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetCustomerChartDataGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerChartDataGet$Plain(params?: AnalyticsGetCustomerChartDataGet$Plain$Params, context?: HttpContext): Observable<Array<GetChartData>> {
    return this.analyticsGetCustomerChartDataGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChartData>>): Array<GetChartData> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetCustomerChartDataGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerChartDataGet$Response(params?: AnalyticsGetCustomerChartDataGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
    return analyticsGetCustomerChartDataGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetCustomerChartDataGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetCustomerChartDataGet(params?: AnalyticsGetCustomerChartDataGet$Params, context?: HttpContext): Observable<Array<GetChartData>> {
    return this.analyticsGetCustomerChartDataGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChartData>>): Array<GetChartData> => r.body)
    );
  }

  /** Path part for operation `analyticsGetChiefChartDataGet()` */
  static readonly AnalyticsGetChiefChartDataGetPath = '/Analytics/GetChiefChartData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetChiefChartDataGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetChiefChartDataGet$Plain$Response(params?: AnalyticsGetChiefChartDataGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
    return analyticsGetChiefChartDataGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetChiefChartDataGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetChiefChartDataGet$Plain(params?: AnalyticsGetChiefChartDataGet$Plain$Params, context?: HttpContext): Observable<Array<GetChartData>> {
    return this.analyticsGetChiefChartDataGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChartData>>): Array<GetChartData> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetChiefChartDataGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetChiefChartDataGet$Response(params?: AnalyticsGetChiefChartDataGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
    return analyticsGetChiefChartDataGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetChiefChartDataGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetChiefChartDataGet(params?: AnalyticsGetChiefChartDataGet$Params, context?: HttpContext): Observable<Array<GetChartData>> {
    return this.analyticsGetChiefChartDataGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChartData>>): Array<GetChartData> => r.body)
    );
  }

  /** Path part for operation `analyticsGetIngredientChartDataGet()` */
  static readonly AnalyticsGetIngredientChartDataGetPath = '/Analytics/GetIngredientChartData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetIngredientChartDataGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientChartDataGet$Plain$Response(params?: AnalyticsGetIngredientChartDataGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
    return analyticsGetIngredientChartDataGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetIngredientChartDataGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientChartDataGet$Plain(params?: AnalyticsGetIngredientChartDataGet$Plain$Params, context?: HttpContext): Observable<Array<GetChartData>> {
    return this.analyticsGetIngredientChartDataGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChartData>>): Array<GetChartData> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analyticsGetIngredientChartDataGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientChartDataGet$Response(params?: AnalyticsGetIngredientChartDataGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChartData>>> {
    return analyticsGetIngredientChartDataGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `analyticsGetIngredientChartDataGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analyticsGetIngredientChartDataGet(params?: AnalyticsGetIngredientChartDataGet$Params, context?: HttpContext): Observable<Array<GetChartData>> {
    return this.analyticsGetIngredientChartDataGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChartData>>): Array<GetChartData> => r.body)
    );
  }

}
