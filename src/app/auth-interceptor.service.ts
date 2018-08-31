import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/users/register') || req.url.includes('/users/login')) {
      return next.handle(req).pipe(map((event: HttpEvent<void>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response and headers you want
          const getToken = event.headers.get('x-auth').toString();
          if (getToken) {
            localStorage.setItem('token', getToken);
            return event;
          }
        }
      }));
    }
    const token = this.auth.getToken();

    if (token) {
      req = req.clone({
        setHeaders: {
          'x-auth': `${token}`
        }
      });
      return next.handle(req);

    }

  }
}
