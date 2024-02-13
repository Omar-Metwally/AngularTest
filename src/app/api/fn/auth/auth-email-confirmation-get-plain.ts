/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AuthEmailConfirmationGet$Plain$Params {
  userID?: string;
  token?: string;
}

export function authEmailConfirmationGet$Plain(http: HttpClient, rootUrl: string, params?: AuthEmailConfirmationGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, authEmailConfirmationGet$Plain.PATH, 'get');
  if (params) {
    rb.query('userID', params.userID, {});
    rb.query('token', params.token, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
    })
  );
}

authEmailConfirmationGet$Plain.PATH = '/Auth/EmailConfirmation';
