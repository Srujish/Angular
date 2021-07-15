import { Injectable } from '@angular/core';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // const token = JSON.parse(sessionStorage.getItem('credentials'));

    // request = request.clone({
    //   headers: request.headers
    //     .append('Authorization', 'Basic '
    //       + btoa('appadmin' + ':' + 'UstAdm!n'))
    // });

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.append('Content-Type', 'application/json') });
    }
    if (request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.delete('Content-Type', 'application/json') });
    }
    if (request.headers.has('Accept')) {
      request = request.clone({ headers: request.headers.append('Accept', 'image/jpeg') });
    }
    if (!request.headers.has('Accept')) {
      request = request.clone({ headers: request.headers.append('Accept', 'application/json') });
    }
    
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
    }));
  }
}
