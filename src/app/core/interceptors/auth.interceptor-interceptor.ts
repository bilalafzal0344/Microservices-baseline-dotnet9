import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // Get token (from localStorage, or ideally, from a secure service)
  const token = localStorage.getItem('jwt_token');
  // If you have an AuthService, use: const token = authService.getToken();

  if (token) {
    // Clone and add Authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // No token? Send request as-is
  return next(req);
};
