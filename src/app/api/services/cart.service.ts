/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Cart } from '../models/cart';
import { cartDelete } from '../fn/cart/cart-delete';
import { CartDelete$Params } from '../fn/cart/cart-delete';
import { cartPost } from '../fn/cart/cart-post';
import { CartPost$Params } from '../fn/cart/cart-post';
import { cartPost$Plain } from '../fn/cart/cart-post-plain';
import { CartPost$Plain$Params } from '../fn/cart/cart-post-plain';

@Injectable({ providedIn: 'root' })
export class CartService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `cartPost()` */
  static readonly CartPostPath = '/Cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cartPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cartPost$Plain$Response(params?: CartPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Cart>>> {
    return cartPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cartPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cartPost$Plain(params?: CartPost$Plain$Params, context?: HttpContext): Observable<Array<Cart>> {
    return this.cartPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Cart>>): Array<Cart> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cartPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cartPost$Response(params?: CartPost$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Cart>>> {
    return cartPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cartPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cartPost(params?: CartPost$Params, context?: HttpContext): Observable<Array<Cart>> {
    return this.cartPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Cart>>): Array<Cart> => r.body)
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
