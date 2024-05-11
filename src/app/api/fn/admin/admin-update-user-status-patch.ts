/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AdminUpdateUserStatusPatch$Params {
  UserID?: string;
  IsEnabled?: boolean;
}

export function adminUpdateUserStatusPatch(http: HttpClient, rootUrl: string, params?: AdminUpdateUserStatusPatch$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, adminUpdateUserStatusPatch.PATH, 'patch');
  if (params) {
    rb.query('UserID', params.UserID, {});
    rb.query('IsEnabled', params.IsEnabled, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

adminUpdateUserStatusPatch.PATH = '/Admin/UpdateUserStatus';
