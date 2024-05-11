/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetChiefProfileDataRequest } from '../../models/get-chief-profile-data-request';

export interface AdminGetWaitingUserGet$Params {
  ChiefID?: string;
}

export function adminGetWaitingUserGet(http: HttpClient, rootUrl: string, params?: AdminGetWaitingUserGet$Params, context?: HttpContext): Observable<StrictHttpResponse<GetChiefProfileDataRequest>> {
  const rb = new RequestBuilder(rootUrl, adminGetWaitingUserGet.PATH, 'get');
  if (params) {
    rb.query('ChiefID', params.ChiefID, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<GetChiefProfileDataRequest>;
    })
  );
}

adminGetWaitingUserGet.PATH = '/Admin/GetWaitingUser';
