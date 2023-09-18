import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionUtils } from '../utils/session.utils';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = SessionUtils.getToken();
        // if (!token){
        //     window.location.href = `${environment.authApiUrl}?page=${window.location}`;
        // }

        const modifiedReq = req.clone({
            headers: new HttpHeaders({
                Authorization: token ? `Bearer ${token}` : '',
            }),
        });

        return next.handle(modifiedReq).pipe(
            catchError((x) => {
                if (
                    (x as HttpErrorResponse).status === 401 ||
                    x.error.message === 'missing or malformed jwt'
                ) {
                    // SessionUtils.clearSession();
                    // window.location.href = `${environment.authApiUrl}?page=${window.location}`;
                }
                
                return throwError(() => x);
            })
        );
    }
}
