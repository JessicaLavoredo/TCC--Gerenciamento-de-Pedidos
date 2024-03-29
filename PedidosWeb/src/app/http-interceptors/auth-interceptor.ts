import { AlertService } from './../services/alert.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private accountService: AccountService, private router: Router, private AlertService: AlertService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const token = this.accountService.getAuthorizationToken();
        let request: HttpRequest<any> = req;

        if (token && !this.accountService.isTokenExpired(token) && request.url.substring(0, 3) === 'api') {

            request = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }



        return next.handle(request)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // Erro de client-side ou de rede
            console.error('Ocorreu um erro:', error.error.message);
        } else {
            if (error.statusText == "Unauthorized") {
                window.localStorage.removeItem('token');
                this.router.navigate(['login']);
            }
        }
        // retornar um observable com uma mensagem amigavel.
        return throwError('Ocorreu um erro, tente novamente');
    }
}
