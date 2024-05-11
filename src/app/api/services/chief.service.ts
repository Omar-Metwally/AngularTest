/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { chiefAddIngredientsPost } from '../fn/chief/chief-add-ingredients-post';
import { ChiefAddIngredientsPost$Params } from '../fn/chief/chief-add-ingredients-post';
import { chiefAddIngredientsPost$Plain } from '../fn/chief/chief-add-ingredients-post-plain';
import { ChiefAddIngredientsPost$Plain$Params } from '../fn/chief/chief-add-ingredients-post-plain';
import { chiefGetChiefMealsGet } from '../fn/chief/chief-get-chief-meals-get';
import { ChiefGetChiefMealsGet$Params } from '../fn/chief/chief-get-chief-meals-get';
import { chiefGetChiefMealsGet$Plain } from '../fn/chief/chief-get-chief-meals-get-plain';
import { ChiefGetChiefMealsGet$Plain$Params } from '../fn/chief/chief-get-chief-meals-get-plain';
import { chiefGetChiefOrdersGet } from '../fn/chief/chief-get-chief-orders-get';
import { ChiefGetChiefOrdersGet$Params } from '../fn/chief/chief-get-chief-orders-get';
import { chiefGetChiefOrdersGet$Plain } from '../fn/chief/chief-get-chief-orders-get-plain';
import { ChiefGetChiefOrdersGet$Plain$Params } from '../fn/chief/chief-get-chief-orders-get-plain';
import { chiefGetChiefProfileDataGet } from '../fn/chief/chief-get-chief-profile-data-get';
import { ChiefGetChiefProfileDataGet$Params } from '../fn/chief/chief-get-chief-profile-data-get';
import { chiefGetChiefProfileDataGet$Plain } from '../fn/chief/chief-get-chief-profile-data-get-plain';
import { ChiefGetChiefProfileDataGet$Plain$Params } from '../fn/chief/chief-get-chief-profile-data-get-plain';
import { chiefGetIngredientsGet } from '../fn/chief/chief-get-ingredients-get';
import { ChiefGetIngredientsGet$Params } from '../fn/chief/chief-get-ingredients-get';
import { chiefGetIngredientsGet$Plain } from '../fn/chief/chief-get-ingredients-get-plain';
import { ChiefGetIngredientsGet$Plain$Params } from '../fn/chief/chief-get-ingredients-get-plain';
import { chiefPost } from '../fn/chief/chief-post';
import { ChiefPost$Params } from '../fn/chief/chief-post';
import { chiefRemoveIngredientsDelete } from '../fn/chief/chief-remove-ingredients-delete';
import { ChiefRemoveIngredientsDelete$Params } from '../fn/chief/chief-remove-ingredients-delete';
import { chiefRemoveIngredientsDelete$Plain } from '../fn/chief/chief-remove-ingredients-delete-plain';
import { ChiefRemoveIngredientsDelete$Plain$Params } from '../fn/chief/chief-remove-ingredients-delete-plain';
import { chiefUpdateOrderItemStatusPatch } from '../fn/chief/chief-update-order-item-status-patch';
import { ChiefUpdateOrderItemStatusPatch$Params } from '../fn/chief/chief-update-order-item-status-patch';
import { GetChiefIngredientRequest } from '../models/get-chief-ingredient-request';
import { GetChiefMealsRequest } from '../models/get-chief-meals-request';
import { GetChiefProfileDataRequest } from '../models/get-chief-profile-data-request';
import { GetOrderItem } from '../models/get-order-item';

@Injectable({ providedIn: 'root' })
export class ChiefService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `chiefPost()` */
  static readonly ChiefPostPath = '/Chief';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  chiefPost$Response(params?: ChiefPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return chiefPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  chiefPost(params?: ChiefPost$Params, context?: HttpContext): Observable<void> {
    return this.chiefPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `chiefGetChiefProfileDataGet()` */
  static readonly ChiefGetChiefProfileDataGetPath = '/Chief/GetChiefProfileData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefGetChiefProfileDataGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefProfileDataGet$Plain$Response(params?: ChiefGetChiefProfileDataGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetChiefProfileDataRequest>> {
    return chiefGetChiefProfileDataGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefGetChiefProfileDataGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefProfileDataGet$Plain(params?: ChiefGetChiefProfileDataGet$Plain$Params, context?: HttpContext): Observable<GetChiefProfileDataRequest> {
    return this.chiefGetChiefProfileDataGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetChiefProfileDataRequest>): GetChiefProfileDataRequest => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefGetChiefProfileDataGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefProfileDataGet$Response(params?: ChiefGetChiefProfileDataGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetChiefProfileDataRequest>> {
    return chiefGetChiefProfileDataGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefGetChiefProfileDataGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefProfileDataGet(params?: ChiefGetChiefProfileDataGet$Params, context?: HttpContext): Observable<GetChiefProfileDataRequest> {
    return this.chiefGetChiefProfileDataGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetChiefProfileDataRequest>): GetChiefProfileDataRequest => r.body)
    );
  }

  /** Path part for operation `chiefAddIngredientsPost()` */
  static readonly ChiefAddIngredientsPostPath = '/Chief/AddIngredients';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefAddIngredientsPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  chiefAddIngredientsPost$Plain$Response(params?: ChiefAddIngredientsPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return chiefAddIngredientsPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefAddIngredientsPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  chiefAddIngredientsPost$Plain(params?: ChiefAddIngredientsPost$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.chiefAddIngredientsPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefAddIngredientsPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  chiefAddIngredientsPost$Response(params?: ChiefAddIngredientsPost$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return chiefAddIngredientsPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefAddIngredientsPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  chiefAddIngredientsPost(params?: ChiefAddIngredientsPost$Params, context?: HttpContext): Observable<boolean> {
    return this.chiefAddIngredientsPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `chiefGetIngredientsGet()` */
  static readonly ChiefGetIngredientsGetPath = '/Chief/GetIngredients';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefGetIngredientsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetIngredientsGet$Plain$Response(params?: ChiefGetIngredientsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChiefIngredientRequest>>> {
    return chiefGetIngredientsGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefGetIngredientsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetIngredientsGet$Plain(params?: ChiefGetIngredientsGet$Plain$Params, context?: HttpContext): Observable<Array<GetChiefIngredientRequest>> {
    return this.chiefGetIngredientsGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChiefIngredientRequest>>): Array<GetChiefIngredientRequest> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefGetIngredientsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetIngredientsGet$Response(params?: ChiefGetIngredientsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetChiefIngredientRequest>>> {
    return chiefGetIngredientsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefGetIngredientsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetIngredientsGet(params?: ChiefGetIngredientsGet$Params, context?: HttpContext): Observable<Array<GetChiefIngredientRequest>> {
    return this.chiefGetIngredientsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetChiefIngredientRequest>>): Array<GetChiefIngredientRequest> => r.body)
    );
  }

  /** Path part for operation `chiefRemoveIngredientsDelete()` */
  static readonly ChiefRemoveIngredientsDeletePath = '/Chief/RemoveIngredients';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefRemoveIngredientsDelete$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefRemoveIngredientsDelete$Plain$Response(params?: ChiefRemoveIngredientsDelete$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<boolean>>> {
    return chiefRemoveIngredientsDelete$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefRemoveIngredientsDelete$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefRemoveIngredientsDelete$Plain(params?: ChiefRemoveIngredientsDelete$Plain$Params, context?: HttpContext): Observable<Array<boolean>> {
    return this.chiefRemoveIngredientsDelete$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<boolean>>): Array<boolean> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefRemoveIngredientsDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefRemoveIngredientsDelete$Response(params?: ChiefRemoveIngredientsDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<boolean>>> {
    return chiefRemoveIngredientsDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefRemoveIngredientsDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefRemoveIngredientsDelete(params?: ChiefRemoveIngredientsDelete$Params, context?: HttpContext): Observable<Array<boolean>> {
    return this.chiefRemoveIngredientsDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<boolean>>): Array<boolean> => r.body)
    );
  }

  /** Path part for operation `chiefGetChiefOrdersGet()` */
  static readonly ChiefGetChiefOrdersGetPath = '/Chief/GetChiefOrders';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefGetChiefOrdersGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefOrdersGet$Plain$Response(params?: ChiefGetChiefOrdersGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetOrderItem>>> {
    return chiefGetChiefOrdersGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefGetChiefOrdersGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefOrdersGet$Plain(params?: ChiefGetChiefOrdersGet$Plain$Params, context?: HttpContext): Observable<Array<GetOrderItem>> {
    return this.chiefGetChiefOrdersGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetOrderItem>>): Array<GetOrderItem> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefGetChiefOrdersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefOrdersGet$Response(params?: ChiefGetChiefOrdersGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetOrderItem>>> {
    return chiefGetChiefOrdersGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefGetChiefOrdersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefOrdersGet(params?: ChiefGetChiefOrdersGet$Params, context?: HttpContext): Observable<Array<GetOrderItem>> {
    return this.chiefGetChiefOrdersGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetOrderItem>>): Array<GetOrderItem> => r.body)
    );
  }

  /** Path part for operation `chiefUpdateOrderItemStatusPatch()` */
  static readonly ChiefUpdateOrderItemStatusPatchPath = '/Chief/UpdateOrderItemStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefUpdateOrderItemStatusPatch()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefUpdateOrderItemStatusPatch$Response(params?: ChiefUpdateOrderItemStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return chiefUpdateOrderItemStatusPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefUpdateOrderItemStatusPatch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefUpdateOrderItemStatusPatch(params?: ChiefUpdateOrderItemStatusPatch$Params, context?: HttpContext): Observable<void> {
    return this.chiefUpdateOrderItemStatusPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `chiefGetChiefMealsGet()` */
  static readonly ChiefGetChiefMealsGetPath = '/Chief/GetChiefMeals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefGetChiefMealsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefMealsGet$Plain$Response(params?: ChiefGetChiefMealsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetChiefMealsRequest>> {
    return chiefGetChiefMealsGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefGetChiefMealsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefMealsGet$Plain(params?: ChiefGetChiefMealsGet$Plain$Params, context?: HttpContext): Observable<GetChiefMealsRequest> {
    return this.chiefGetChiefMealsGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetChiefMealsRequest>): GetChiefMealsRequest => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chiefGetChiefMealsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefMealsGet$Response(params?: ChiefGetChiefMealsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetChiefMealsRequest>> {
    return chiefGetChiefMealsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `chiefGetChiefMealsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chiefGetChiefMealsGet(params?: ChiefGetChiefMealsGet$Params, context?: HttpContext): Observable<GetChiefMealsRequest> {
    return this.chiefGetChiefMealsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetChiefMealsRequest>): GetChiefMealsRequest => r.body)
    );
  }

}
