import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    if(error.status === 400){
                        Swal.fire({
                            title: error.error.message,
                            html: error.error.description,
                            type: "error"
                          })
                    }else if(error.status === 401){
                        Swal.fire({
                            title: error.error.message,
                            html: error.error.description,
                            type: "error"
                          })
                    }else if(error.status === 403){
                        Swal.fire({
                            title: error.error.message,
                            html: error.error.description,
                            type: "error"
                          })
                    }
                    return throwError(error.message);
                })
            )
    }
}