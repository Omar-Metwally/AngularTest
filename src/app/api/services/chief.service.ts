/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { chiefPost } from '../fn/chief/chief-post';
import { ChiefPost$Params } from '../fn/chief/chief-post';

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

}
