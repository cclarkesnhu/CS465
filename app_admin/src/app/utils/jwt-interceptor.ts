import { inject, Injectable, Provider } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication';

// Class-based interceptor (for backward compatibility)
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthAPI = request.url.includes('login') || request.url.includes('register');
    
    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      const token = this.authenticationService.getToken();
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}

// Functional interceptor (for new Angular versions)
export const jwtInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const isAuthAPI = req.url.includes('login') || req.url.includes('register');
  
  if (authService.isLoggedIn() && !isAuthAPI) {
    const token = authService.getToken();
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }
  return next(req);
};

// Provider for class-based interceptor
export const authInterceptProvider: Provider =
{ provide: HTTP_INTERCEPTORS,
useClass: JwtInterceptor, multi: true };