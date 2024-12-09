import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const timeHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  // Get current time in ISO format
  const currentTime = new Date().toISOString();

  // Clone the request and add the new header
  const modifiedReq = req.clone({
    setHeaders: {
      'X-Current-Time': currentTime
    }
  });

  // Pass the modified request to the next handler
  return next(modifiedReq).pipe(tap({
    complete: () => {
        const date = new Date().toISOString();
        document.cookie=`X-Current-Time=${date};path=/`
    }
       
    
  })
  );
};