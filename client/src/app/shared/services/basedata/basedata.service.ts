import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseDataService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly router: Router
    ) {}

    public post<T>(route: string, body: any): Observable<T | null> {
        return this.extendPipe(
            this.httpClient.post<T>(this.buildUrl(route), body, {
                observe: 'response',
            })
        ).pipe(map((resp) => resp.body));
    }

    public put<T>(route: string, body: any): Observable<T> {
        return this.extendPipe(
            this.httpClient.put<T>(this.buildUrl(route), body)
        );
    }

    public get<T>(
        route: string,
        parameters: {
            [param: string]: string | number | boolean | string[];
        } | null = null
    ): Observable<T | null> {
        const params = this.buildQueryStringParams(parameters);
        return this.extendPipe(
            this.httpClient.get<T>(this.buildUrl(route), {
                params,
                observe: 'response',
            })
        ).pipe(map((resp) => resp.body));
    }

    public delete<T>(
        route: string,
        parameters: {
            [param: string]: string | number | boolean | string[];
        } | null = null
    ): Observable<T> {
        const params = this.buildQueryStringParams(parameters);
        return this.extendPipe(
            this.httpClient.delete<T>(this.buildUrl(route), { params })
        );
    }

    private extendPipe<T>(httpObservable: Observable<T>): Observable<T> {
        return httpObservable.pipe(
            catchError((err: HttpResponse<T>) => {
                if (err.status === 400) {
                    return throwError(err);
                } else {
                    this.router.navigate(['/error/' + err.status]);
                    return throwError(err);
                }
            })
        );
    }

    private buildUrl(route: string): string {
        return `${environment.apiUrl}${route}`;
    }

    private buildQueryStringParams(
        params: {
            [param: string]: string | number | boolean | string[];
        } | null
    ): { [param: string]: string | string[] } {
        if (!params) {
            return {};
        }
        const parameters = Object.keys(params)
            .filter(
                (param) => params[param] || typeof params[param] === 'number'
            )
            .map((param) => ({
                [param]: Array.isArray(params[param])
                    ? params[param]
                    : params[param].toString(),
            }));
        return Object.assign({}, ...parameters);
    }
}
