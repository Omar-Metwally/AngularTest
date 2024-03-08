/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { GetSideDishRequest } from '../models/get-side-dish-request';
import { sideDishCreateSideDishPost } from '../fn/side-dish/side-dish-create-side-dish-post';
import { SideDishCreateSideDishPost$Params } from '../fn/side-dish/side-dish-create-side-dish-post';
import { sideDishCreateSideDishPost$Plain } from '../fn/side-dish/side-dish-create-side-dish-post-plain';
import { SideDishCreateSideDishPost$Plain$Params } from '../fn/side-dish/side-dish-create-side-dish-post-plain';
import { sideDishGet } from '../fn/side-dish/side-dish-get';
import { SideDishGet$Params } from '../fn/side-dish/side-dish-get';
import { sideDishGet$Plain } from '../fn/side-dish/side-dish-get-plain';
import { SideDishGet$Plain$Params } from '../fn/side-dish/side-dish-get-plain';
import { sideDishSideDishIdGet } from '../fn/side-dish/side-dish-side-dish-id-get';
import { SideDishSideDishIdGet$Params } from '../fn/side-dish/side-dish-side-dish-id-get';
import { sideDishSideDishIdGet$Plain } from '../fn/side-dish/side-dish-side-dish-id-get-plain';
import { SideDishSideDishIdGet$Plain$Params } from '../fn/side-dish/side-dish-side-dish-id-get-plain';
import { sideDishUpdateSideDishPut } from '../fn/side-dish/side-dish-update-side-dish-put';
import { SideDishUpdateSideDishPut$Params } from '../fn/side-dish/side-dish-update-side-dish-put';

@Injectable({ providedIn: 'root' })
export class SideDishService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `sideDishCreateSideDishPost()` */
  static readonly SideDishCreateSideDishPostPath = '/SideDish/CreateSideDish';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishCreateSideDishPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishCreateSideDishPost$Plain$Response(params?: SideDishCreateSideDishPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return sideDishCreateSideDishPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishCreateSideDishPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishCreateSideDishPost$Plain(params?: SideDishCreateSideDishPost$Plain$Params, context?: HttpContext): Observable<string> {
    return this.sideDishCreateSideDishPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishCreateSideDishPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishCreateSideDishPost$Response(params?: SideDishCreateSideDishPost$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return sideDishCreateSideDishPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishCreateSideDishPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishCreateSideDishPost(params?: SideDishCreateSideDishPost$Params, context?: HttpContext): Observable<string> {
    return this.sideDishCreateSideDishPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `sideDishUpdateSideDishPut()` */
  static readonly SideDishUpdateSideDishPutPath = '/SideDish/UpdateSideDish';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishUpdateSideDishPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishUpdateSideDishPut$Response(params?: SideDishUpdateSideDishPut$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return sideDishUpdateSideDishPut(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishUpdateSideDishPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sideDishUpdateSideDishPut(params?: SideDishUpdateSideDishPut$Params, context?: HttpContext): Observable<void> {
    return this.sideDishUpdateSideDishPut$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `sideDishSideDishIdGet()` */
  static readonly SideDishSideDishIdGetPath = '/SideDish/{SideDishID}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishSideDishIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishSideDishIdGet$Plain$Response(params: SideDishSideDishIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetSideDishRequest>> {
    return sideDishSideDishIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishSideDishIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishSideDishIdGet$Plain(params: SideDishSideDishIdGet$Plain$Params, context?: HttpContext): Observable<GetSideDishRequest> {
    return this.sideDishSideDishIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetSideDishRequest>): GetSideDishRequest => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishSideDishIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishSideDishIdGet$Response(params: SideDishSideDishIdGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetSideDishRequest>> {
    return sideDishSideDishIdGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishSideDishIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishSideDishIdGet(params: SideDishSideDishIdGet$Params, context?: HttpContext): Observable<GetSideDishRequest> {
    return this.sideDishSideDishIdGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetSideDishRequest>): GetSideDishRequest => r.body)
    );
  }

  /** Path part for operation `sideDishGet()` */
  static readonly SideDishGetPath = '/SideDish';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishGet$Plain$Response(params: SideDishGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetSideDishRequest>>> {
    return sideDishGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishGet$Plain(params: SideDishGet$Plain$Params, context?: HttpContext): Observable<Array<GetSideDishRequest>> {
    return this.sideDishGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetSideDishRequest>>): Array<GetSideDishRequest> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sideDishGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishGet$Response(params: SideDishGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetSideDishRequest>>> {
    return sideDishGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sideDishGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sideDishGet(params: SideDishGet$Params, context?: HttpContext): Observable<Array<GetSideDishRequest>> {
    return this.sideDishGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetSideDishRequest>>): Array<GetSideDishRequest> => r.body)
    );
  }

}
