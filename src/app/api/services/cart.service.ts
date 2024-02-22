/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { cartDelete } from '../fn/cart/cart-delete';
import { CartDelete$Params } from '../fn/cart/cart-delete';
import { cartGet } from '../fn/cart/cart-get';
import { CartGet$Params } from '../fn/cart/cart-get';
import { cartGet$Plain } from '../fn/cart/cart-get-plain';
import { CartGet$Plain$Params } from '../fn/cart/cart-get-plain';
import { cartPost } from '../fn/cart/cart-post';
import { CartPost$Params } from '../fn/cart/cart-post';

@Injectable({ providedIn: 'root' })
export class CartService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `cartGet()` */
  static readonly CartGetPath = '/Cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cartGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  cartGet$Plain$Response(params?: CartGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return cartGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cartGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cartGet$Plain(params?: CartGet$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.cartGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cartGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  cartGet$Response(params?: CartGet$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return cartGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cartGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cartGet(params?: CartGet$Params, context?: HttpContext): Observable<boolean> {
    return this.cartGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `cartPost()` */
  static readonly CartPostPath = '/Cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cartPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cartPost$Response(params?: CartPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return cartPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cartPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cartPost(params?: CartPost$Params, context?: HttpContext): Observable<void> {
    return this.cartPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `cartDelete()` */
  static readonly CartDeletePath = '/Cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cartDelete()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cartDelete$Response(params?: CartDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return cartDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cartDelete$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cartDelete(params?: CartDelete$Params, context?: HttpContext): Observable<void> {
    return this.cartDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
