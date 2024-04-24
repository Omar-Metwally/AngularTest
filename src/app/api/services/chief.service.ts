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
import { GetChiefIngredientRequest } from '../models/get-chief-ingredient-request';
import { GetChiefProfileDataRequest } from '../models/get-chief-profile-data-request';

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

}
