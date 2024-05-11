/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetCustomerProfileDataRequest } from '../../models/get-customer-profile-data-request';

export interface AuthCustomerProfileGet$Plain$Params {
}

export function authCustomerProfileGet$Plain(http: HttpClient, rootUrl: string, params?: AuthCustomerProfileGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<GetCustomerProfileDataRequest>> {
  const rb = new RequestBuilder(rootUrl, authCustomerProfileGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetCustomerProfileDataRequest>;
    })
  );
}

authCustomerProfileGet$Plain.PATH = '/Auth/CustomerProfile';
