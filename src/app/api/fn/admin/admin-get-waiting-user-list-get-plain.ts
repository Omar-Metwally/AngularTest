/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetWaitingUserList } from '../../models/get-waiting-user-list';

export interface AdminGetWaitingUserListGet$Plain$Params {
}

export function adminGetWaitingUserListGet$Plain(http: HttpClient, rootUrl: string, params?: AdminGetWaitingUserListGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GetWaitingUserList>>> {
  const rb = new RequestBuilder(rootUrl, adminGetWaitingUserListGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GetWaitingUserList>>;
    })
  );
}

adminGetWaitingUserListGet$Plain.PATH = '/Admin/GetWaitingUserList';
