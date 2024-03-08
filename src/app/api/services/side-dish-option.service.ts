/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { GetSideDishOptionRequest } from '../models/get-side-dish-option-request';
import { sideDishOptionChiefIdGet } from '../fn/side-dish-option/side-dish-option-chief-id-get';
import { SideDishOptionChiefIdGet$Params } from '../fn/side-dish-option/side-dish-option-chief-id-get';
import { sideDishOptionChiefIdGet$Plain } from '../fn/side-dish-option/side-dish-option-chief-id-get-plain';
import { SideDishOptionChiefIdGet$Plain$Params } from '../fn/side-dish-option/side-dish-option-chief-id-get-plain';
import { sideDishOptionCreateSideDishOptionPost } from '../fn/side-dish-option/side-dish-option-create-side-dish-option-post';
import { SideDishOptionCreateSideDishOptionPost$Params } from '../fn/side-dish-option/side-dish-option-create-side-dish-option-post';
import { sideDishOptionCreateSideDishOptionPost$Plain } from '../fn/side-dish-option/side-dish-option-create-side-dish-option-post-plain';
import { SideDishOptionCreateSideDishOptionPost$Plain$Params } from '../fn/side-dish-option/side-dish-option-create-side-dish-option-post-plain';
import { sideDishOptionUpdateSideDishOptionPut } from '../fn/side-dish-option/side-dish-option-update-side-dish-option-put';
import { SideDishOptionUpdateSideDishOptionPut$Params } from '../fn/side-dish-option/side-dish-option-update-side-dish-option-put';

@Injectable({ providedIn: 'root' })
export class SideDishOptionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `sideDishOptionCreateSideDishOptionPost()` */
  static readonly SideDishOptionCreateSideDishOptionPostPath = '/SideDishOption/CreateSideDishOption';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishOptionCreateSideDishOptionPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishOptionCreateSideDishOptionPost$Plain$Response(params?: SideDishOptionCreateSideDishOptionPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return sideDishOptionCreateSideDishOptionPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishOptionCreateSideDishOptionPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishOptionCreateSideDishOptionPost$Plain(params?: SideDishOptionCreateSideDishOptionPost$Plain$Params, context?: HttpContext): Observable<string> {
    return this.sideDishOptionCreateSideDishOptionPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishOptionCreateSideDishOptionPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishOptionCreateSideDishOptionPost$Response(params?: SideDishOptionCreateSideDishOptionPost$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return sideDishOptionCreateSideDishOptionPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishOptionCreateSideDishOptionPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishOptionCreateSideDishOptionPost(params?: SideDishOptionCreateSideDishOptionPost$Params, context?: HttpContext): Observable<string> {
    return this.sideDishOptionCreateSideDishOptionPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `sideDishOptionUpdateSideDishOptionPut()` */
  static readonly SideDishOptionUpdateSideDishOptionPutPath = '/SideDishOption/UpdateSideDishOption';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishOptionUpdateSideDishOptionPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishOptionUpdateSideDishOptionPut$Response(params?: SideDishOptionUpdateSideDishOptionPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return sideDishOptionUpdateSideDishOptionPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishOptionUpdateSideDishOptionPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishOptionUpdateSideDishOptionPut(params?: SideDishOptionUpdateSideDishOptionPut$Params, context?: HttpContext): Observable<void> {
    return this.sideDishOptionUpdateSideDishOptionPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `sideDishOptionChiefIdGet()` */
  static readonly SideDishOptionChiefIdGetPath = '/SideDishOption/{ChiefID}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishOptionChiefIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishOptionChiefIdGet$Plain$Response(params: SideDishOptionChiefIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetSideDishOptionRequest>>> {
    return sideDishOptionChiefIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishOptionChiefIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishOptionChiefIdGet$Plain(params: SideDishOptionChiefIdGet$Plain$Params, context?: HttpContext): Observable<Array<GetSideDishOptionRequest>> {
    return this.sideDishOptionChiefIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetSideDishOptionRequest>>): Array<GetSideDishOptionRequest> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishOptionChiefIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishOptionChiefIdGet$Response(params?: SideDishOptionChiefIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetSideDishOptionRequest>>> {
    return sideDishOptionChiefIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishOptionChiefIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishOptionChiefIdGet(params?: SideDishOptionChiefIdGet$Params, context?: HttpContext): Observable<Array<GetSideDishOptionRequest>> {
    return this.sideDishOptionChiefIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetSideDishOptionRequest>>): Array<GetSideDishOptionRequest> => r.body)
    );
  }

}
