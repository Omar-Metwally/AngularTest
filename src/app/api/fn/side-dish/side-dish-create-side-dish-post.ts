/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateSideDishRequest } from '../../models/create-side-dish-request';

export interface SideDishCreateSideDishPost$Params {
      body?: CreateSideDishRequest
}

export function sideDishCreateSideDishPost(http: HttpClient, rootUrl: string, params?: SideDishCreateSideDishPost$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, sideDishCreateSideDishPost.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

sideDishCreateSideDishPost.PATH = '/SideDish/CreateSideDish';
