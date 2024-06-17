import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environment/environment.prod';
import { map } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    url: environment.apiUrl + req.url,
  });
  return next(clonedRequest).pipe(
    map((response: any) => {
      if (response.body?.error) {
        throw new HttpErrorResponse(response?.body);
      }
      return response;
    })
  );
};
