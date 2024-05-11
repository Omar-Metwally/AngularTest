/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { adminGetWaitingUserGet } from '../fn/admin/admin-get-waiting-user-get';
import { AdminGetWaitingUserGet$Params } from '../fn/admin/admin-get-waiting-user-get';
import { adminGetWaitingUserGet$Plain } from '../fn/admin/admin-get-waiting-user-get-plain';
import { AdminGetWaitingUserGet$Plain$Params } from '../fn/admin/admin-get-waiting-user-get-plain';
import { adminGetWaitingUserListGet } from '../fn/admin/admin-get-waiting-user-list-get';
import { AdminGetWaitingUserListGet$Params } from '../fn/admin/admin-get-waiting-user-list-get';
import { adminGetWaitingUserListGet$Plain } from '../fn/admin/admin-get-waiting-user-list-get-plain';
import { AdminGetWaitingUserListGet$Plain$Params } from '../fn/admin/admin-get-waiting-user-list-get-plain';
import { adminUpdateUserStatusPatch } from '../fn/admin/admin-update-user-status-patch';
import { AdminUpdateUserStatusPatch$Params } from '../fn/admin/admin-update-user-status-patch';
import { GetChiefProfileDataRequest } from '../models/get-chief-profile-data-request';
import { GetWaitingUserList } from '../models/get-waiting-user-list';

@Injectable({ providedIn: 'root' })
export class AdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `adminGetWaitingUserListGet()` */
  static readonly AdminGetWaitingUserListGetPath = '/Admin/GetWaitingUserList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminGetWaitingUserListGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminGetWaitingUserListGet$Plain$Response(params?: AdminGetWaitingUserListGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetWaitingUserList>>> {
    return adminGetWaitingUserListGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminGetWaitingUserListGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminGetWaitingUserListGet$Plain(params?: AdminGetWaitingUserListGet$Plain$Params, context?: HttpContext): Observable<Array<GetWaitingUserList>> {
    return this.adminGetWaitingUserListGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetWaitingUserList>>): Array<GetWaitingUserList> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminGetWaitingUserListGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminGetWaitingUserListGet$Response(params?: AdminGetWaitingUserListGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetWaitingUserList>>> {
    return adminGetWaitingUserListGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminGetWaitingUserListGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminGetWaitingUserListGet(params?: AdminGetWaitingUserListGet$Params, context?: HttpContext): Observable<Array<GetWaitingUserList>> {
    return this.adminGetWaitingUserListGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<GetWaitingUserList>>): Array<GetWaitingUserList> => r.body)
    );
  }

  /** Path part for operation `adminGetWaitingUserGet()` */
  static readonly AdminGetWaitingUserGetPath = '/Admin/GetWaitingUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminGetWaitingUserGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminGetWaitingUserGet$Plain$Response(params?: AdminGetWaitingUserGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetChiefProfileDataRequest>> {
    return adminGetWaitingUserGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminGetWaitingUserGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminGetWaitingUserGet$Plain(params?: AdminGetWaitingUserGet$Plain$Params, context?: HttpContext): Observable<GetChiefProfileDataRequest> {
    return this.adminGetWaitingUserGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetChiefProfileDataRequest>): GetChiefProfileDataRequest => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminGetWaitingUserGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminGetWaitingUserGet$Response(params?: AdminGetWaitingUserGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetChiefProfileDataRequest>> {
    return adminGetWaitingUserGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminGetWaitingUserGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminGetWaitingUserGet(params?: AdminGetWaitingUserGet$Params, context?: HttpContext): Observable<GetChiefProfileDataRequest> {
    return this.adminGetWaitingUserGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetChiefProfileDataRequest>): GetChiefProfileDataRequest => r.body)
    );
  }

  /** Path part for operation `adminUpdateUserStatusPatch()` */
  static readonly AdminUpdateUserStatusPatchPath = '/Admin/UpdateUserStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminUpdateUserStatusPatch()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminUpdateUserStatusPatch$Response(params?: AdminUpdateUserStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return adminUpdateUserStatusPatch(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminUpdateUserStatusPatch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminUpdateUserStatusPatch(params?: AdminUpdateUserStatusPatch$Params, context?: HttpContext): Observable<void> {
    return this.adminUpdateUserStatusPatch$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
