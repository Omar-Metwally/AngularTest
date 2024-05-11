/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authAddRolePost } from '../fn/auth/auth-add-role-post';
import { AuthAddRolePost$Params } from '../fn/auth/auth-add-role-post';
import { authCheckEmailPost } from '../fn/auth/auth-check-email-post';
import { AuthCheckEmailPost$Params } from '../fn/auth/auth-check-email-post';
import { authCheckEmailPost$Plain } from '../fn/auth/auth-check-email-post-plain';
import { AuthCheckEmailPost$Plain$Params } from '../fn/auth/auth-check-email-post-plain';
import { authChiefSignUpPost } from '../fn/auth/auth-chief-sign-up-post';
import { AuthChiefSignUpPost$Params } from '../fn/auth/auth-chief-sign-up-post';
import { authChiefSignUpPost$Plain } from '../fn/auth/auth-chief-sign-up-post-plain';
import { AuthChiefSignUpPost$Plain$Params } from '../fn/auth/auth-chief-sign-up-post-plain';
import { authCustomerProfileGet } from '../fn/auth/auth-customer-profile-get';
import { AuthCustomerProfileGet$Params } from '../fn/auth/auth-customer-profile-get';
import { authCustomerProfileGet$Plain } from '../fn/auth/auth-customer-profile-get-plain';
import { AuthCustomerProfileGet$Plain$Params } from '../fn/auth/auth-customer-profile-get-plain';
import { authCustomerProfilePost } from '../fn/auth/auth-customer-profile-post';
import { AuthCustomerProfilePost$Params } from '../fn/auth/auth-customer-profile-post';
import { authCustomerSignUpPost } from '../fn/auth/auth-customer-sign-up-post';
import { AuthCustomerSignUpPost$Params } from '../fn/auth/auth-customer-sign-up-post';
import { authCustomerSignUpPost$Plain } from '../fn/auth/auth-customer-sign-up-post-plain';
import { AuthCustomerSignUpPost$Plain$Params } from '../fn/auth/auth-customer-sign-up-post-plain';
import { authEmailConfirmationGet } from '../fn/auth/auth-email-confirmation-get';
import { AuthEmailConfirmationGet$Params } from '../fn/auth/auth-email-confirmation-get';
import { authEmailConfirmationGet$Plain } from '../fn/auth/auth-email-confirmation-get-plain';
import { AuthEmailConfirmationGet$Plain$Params } from '../fn/auth/auth-email-confirmation-get-plain';
import { authLoginPost } from '../fn/auth/auth-login-post';
import { AuthLoginPost$Params } from '../fn/auth/auth-login-post';
import { authLoginPost$Plain } from '../fn/auth/auth-login-post-plain';
import { AuthLoginPost$Plain$Params } from '../fn/auth/auth-login-post-plain';
import { AuthModel } from '../models/auth-model';
import { authRefreshTokenGet } from '../fn/auth/auth-refresh-token-get';
import { AuthRefreshTokenGet$Params } from '../fn/auth/auth-refresh-token-get';
import { authRefreshTokenGet$Plain } from '../fn/auth/auth-refresh-token-get-plain';
import { AuthRefreshTokenGet$Plain$Params } from '../fn/auth/auth-refresh-token-get-plain';
import { authResendEmailConfirmationEmailPost } from '../fn/auth/auth-resend-email-confirmation-email-post';
import { AuthResendEmailConfirmationEmailPost$Params } from '../fn/auth/auth-resend-email-confirmation-email-post';
import { authResendEmailConfirmationEmailPost$Plain } from '../fn/auth/auth-resend-email-confirmation-email-post-plain';
import { AuthResendEmailConfirmationEmailPost$Plain$Params } from '../fn/auth/auth-resend-email-confirmation-email-post-plain';
import { authRevokeTokenGet } from '../fn/auth/auth-revoke-token-get';
import { AuthRevokeTokenGet$Params } from '../fn/auth/auth-revoke-token-get';
import { GetCustomerProfileDataRequest } from '../models/get-customer-profile-data-request';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authCustomerSignUpPost()` */
  static readonly AuthCustomerSignUpPostPath = '/Auth/CustomerSignUp';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authCustomerSignUpPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authCustomerSignUpPost$Plain$Response(params?: AuthCustomerSignUpPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthModel>> {
    return authCustomerSignUpPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authCustomerSignUpPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authCustomerSignUpPost$Plain(params?: AuthCustomerSignUpPost$Plain$Params, context?: HttpContext): Observable<AuthModel> {
    return this.authCustomerSignUpPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthModel>): AuthModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authCustomerSignUpPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authCustomerSignUpPost$Response(params?: AuthCustomerSignUpPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthModel>> {
    return authCustomerSignUpPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authCustomerSignUpPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authCustomerSignUpPost(params?: AuthCustomerSignUpPost$Params, context?: HttpContext): Observable<AuthModel> {
    return this.authCustomerSignUpPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthModel>): AuthModel => r.body)
    );
  }

  /** Path part for operation `authChiefSignUpPost()` */
  static readonly AuthChiefSignUpPostPath = '/Auth/ChiefSignUp';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authChiefSignUpPost$Plain()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  authChiefSignUpPost$Plain$Response(params?: AuthChiefSignUpPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthModel>> {
    return authChiefSignUpPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authChiefSignUpPost$Plain$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  authChiefSignUpPost$Plain(params?: AuthChiefSignUpPost$Plain$Params, context?: HttpContext): Observable<AuthModel> {
    return this.authChiefSignUpPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthModel>): AuthModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authChiefSignUpPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  authChiefSignUpPost$Response(params?: AuthChiefSignUpPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthModel>> {
    return authChiefSignUpPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authChiefSignUpPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  authChiefSignUpPost(params?: AuthChiefSignUpPost$Params, context?: HttpContext): Observable<AuthModel> {
    return this.authChiefSignUpPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthModel>): AuthModel => r.body)
    );
  }

  /** Path part for operation `authLoginPost()` */
  static readonly AuthLoginPostPath = '/Auth/Login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authLoginPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Plain$Response(params?: AuthLoginPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthModel>> {
    return authLoginPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authLoginPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Plain(params?: AuthLoginPost$Plain$Params, context?: HttpContext): Observable<AuthModel> {
    return this.authLoginPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthModel>): AuthModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authLoginPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost$Response(params?: AuthLoginPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthModel>> {
    return authLoginPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authLoginPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authLoginPost(params?: AuthLoginPost$Params, context?: HttpContext): Observable<AuthModel> {
    return this.authLoginPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthModel>): AuthModel => r.body)
    );
  }

  /** Path part for operation `authAddRolePost()` */
  static readonly AuthAddRolePostPath = '/Auth/addRole';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authAddRolePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authAddRolePost$Response(params?: AuthAddRolePost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authAddRolePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authAddRolePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authAddRolePost(params?: AuthAddRolePost$Params, context?: HttpContext): Observable<void> {
    return this.authAddRolePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `authRefreshTokenGet()` */
  static readonly AuthRefreshTokenGetPath = '/Auth/refreshToken';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRefreshTokenGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  authRefreshTokenGet$Plain$Response(params?: AuthRefreshTokenGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthModel>> {
    return authRefreshTokenGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authRefreshTokenGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authRefreshTokenGet$Plain(params?: AuthRefreshTokenGet$Plain$Params, context?: HttpContext): Observable<AuthModel> {
    return this.authRefreshTokenGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthModel>): AuthModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRefreshTokenGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  authRefreshTokenGet$Response(params?: AuthRefreshTokenGet$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthModel>> {
    return authRefreshTokenGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authRefreshTokenGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authRefreshTokenGet(params?: AuthRefreshTokenGet$Params, context?: HttpContext): Observable<AuthModel> {
    return this.authRefreshTokenGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthModel>): AuthModel => r.body)
    );
  }

  /** Path part for operation `authRevokeTokenGet()` */
  static readonly AuthRevokeTokenGetPath = '/Auth/revokeToken';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authRevokeTokenGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  authRevokeTokenGet$Response(params?: AuthRevokeTokenGet$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authRevokeTokenGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authRevokeTokenGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authRevokeTokenGet(params?: AuthRevokeTokenGet$Params, context?: HttpContext): Observable<void> {
    return this.authRevokeTokenGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `authCheckEmailPost()` */
  static readonly AuthCheckEmailPostPath = '/Auth/CheckEmail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authCheckEmailPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authCheckEmailPost$Plain$Response(params?: AuthCheckEmailPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return authCheckEmailPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authCheckEmailPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authCheckEmailPost$Plain(params?: AuthCheckEmailPost$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.authCheckEmailPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authCheckEmailPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authCheckEmailPost$Response(params?: AuthCheckEmailPost$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return authCheckEmailPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authCheckEmailPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authCheckEmailPost(params?: AuthCheckEmailPost$Params, context?: HttpContext): Observable<boolean> {
    return this.authCheckEmailPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `authResendEmailConfirmationEmailPost()` */
  static readonly AuthResendEmailConfirmationEmailPostPath = '/Auth/ResendEmailConfirmation/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authResendEmailConfirmationEmailPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  authResendEmailConfirmationEmailPost$Plain$Response(params: AuthResendEmailConfirmationEmailPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return authResendEmailConfirmationEmailPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authResendEmailConfirmationEmailPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authResendEmailConfirmationEmailPost$Plain(params: AuthResendEmailConfirmationEmailPost$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.authResendEmailConfirmationEmailPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authResendEmailConfirmationEmailPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  authResendEmailConfirmationEmailPost$Response(params: AuthResendEmailConfirmationEmailPost$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return authResendEmailConfirmationEmailPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authResendEmailConfirmationEmailPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authResendEmailConfirmationEmailPost(params: AuthResendEmailConfirmationEmailPost$Params, context?: HttpContext): Observable<boolean> {
    return this.authResendEmailConfirmationEmailPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `authCustomerProfileGet()` */
  static readonly AuthCustomerProfileGetPath = '/Auth/CustomerProfile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authCustomerProfileGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  authCustomerProfileGet$Plain$Response(params?: AuthCustomerProfileGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetCustomerProfileDataRequest>> {
    return authCustomerProfileGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authCustomerProfileGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authCustomerProfileGet$Plain(params?: AuthCustomerProfileGet$Plain$Params, context?: HttpContext): Observable<GetCustomerProfileDataRequest> {
    return this.authCustomerProfileGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetCustomerProfileDataRequest>): GetCustomerProfileDataRequest => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authCustomerProfileGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  authCustomerProfileGet$Response(params?: AuthCustomerProfileGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetCustomerProfileDataRequest>> {
    return authCustomerProfileGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authCustomerProfileGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authCustomerProfileGet(params?: AuthCustomerProfileGet$Params, context?: HttpContext): Observable<GetCustomerProfileDataRequest> {
    return this.authCustomerProfileGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<GetCustomerProfileDataRequest>): GetCustomerProfileDataRequest => r.body)
    );
  }

  /** Path part for operation `authCustomerProfilePost()` */
  static readonly AuthCustomerProfilePostPath = '/Auth/CustomerProfile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authCustomerProfilePost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authCustomerProfilePost$Response(params?: AuthCustomerProfilePost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authCustomerProfilePost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authCustomerProfilePost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authCustomerProfilePost(params?: AuthCustomerProfilePost$Params, context?: HttpContext): Observable<void> {
    return this.authCustomerProfilePost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `authEmailConfirmationGet()` */
  static readonly AuthEmailConfirmationGetPath = '/Auth/EmailConfirmation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authEmailConfirmationGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  authEmailConfirmationGet$Plain$Response(params?: AuthEmailConfirmationGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return authEmailConfirmationGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authEmailConfirmationGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authEmailConfirmationGet$Plain(params?: AuthEmailConfirmationGet$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.authEmailConfirmationGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authEmailConfirmationGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  authEmailConfirmationGet$Response(params?: AuthEmailConfirmationGet$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return authEmailConfirmationGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authEmailConfirmationGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authEmailConfirmationGet(params?: AuthEmailConfirmationGet$Params, context?: HttpContext): Observable<boolean> {
    return this.authEmailConfirmationGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
