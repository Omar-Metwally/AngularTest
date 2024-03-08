/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CashInPaymentKeyResponse } from '../models/cash-in-payment-key-response';
import { orderCashinCallbackPost } from '../fn/order/order-cashin-callback-post';
import { OrderCashinCallbackPost$Params } from '../fn/order/order-cashin-callback-post';
import { orderPost } from '../fn/order/order-post';
import { OrderPost$Params } from '../fn/order/order-post';
import { orderPost$Plain } from '../fn/order/order-post-plain';
import { OrderPost$Plain$Params } from '../fn/order/order-post-plain';

@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `orderPost()` */
  static readonly OrderPostPath = '/Order';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  orderPost$Plain$Response(params?: OrderPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CashInPaymentKeyResponse>> {
    return orderPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  orderPost$Plain(params?: OrderPost$Plain$Params, context?: HttpContext): Observable<CashInPaymentKeyResponse> {
    return this.orderPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CashInPaymentKeyResponse>): CashInPaymentKeyResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  orderPost$Response(params?: OrderPost$Params, context?: HttpContext): Observable<StrictHttpResponse<CashInPaymentKeyResponse>> {
    return orderPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  orderPost(params?: OrderPost$Params, context?: HttpContext): Observable<CashInPaymentKeyResponse> {
    return this.orderPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<CashInPaymentKeyResponse>): CashInPaymentKeyResponse => r.body)
    );
  }

  /** Path part for operation `orderCashinCallbackPost()` */
  static readonly OrderCashinCallbackPostPath = '/Order/cashin-callback';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orderCashinCallbackPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  orderCashinCallbackPost$Response(params?: OrderCashinCallbackPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return orderCashinCallbackPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `orderCashinCallbackPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  orderCashinCallbackPost(params?: OrderCashinCallbackPost$Params, context?: HttpContext): Observable<void> {
    return this.orderCashinCallbackPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
