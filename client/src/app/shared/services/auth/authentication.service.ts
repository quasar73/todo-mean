import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';
import { LoginModel } from '../../models/login.model';
import { RegisterModel } from '../../models/register.model';
import { TokenStorage } from './token-storage.service';
import { BaseDataService } from '../basedata/basedata.service';
import { UserData } from '../../models/user-data.model';

const jwtHelper = new JwtHelperService();

interface AccessData {
    token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements AuthService {
    constructor(
        private readonly tokenStorage: TokenStorage,
        private base: BaseDataService
    ) {}

    public isAuthorized(): Observable<boolean> {
        return this.tokenStorage.getAccessToken().pipe(map((token) => !!token));
    }

    public getUserData(): Observable<UserData> {
        return this.tokenStorage
            .getAccessToken()
            .pipe(
                map(
                    (token) =>
                        jwtHelper.decodeToken(token)
                )
            );
    }

    public getAccessToken(): Observable<string> {
        return this.tokenStorage.getAccessToken();
    }

    public refreshToken(): Observable<AccessData> {
        return this.tokenStorage.getRefreshToken().pipe(
            switchMap((refreshToken: string) =>
                this.base.post('auth/refresh', {
                    refreshToken,
                })
            ),
            tap((tokens: any) => this.saveAccessData(tokens)),
            catchError((err) => {
                this.logout();
                return Observable.throw(err);
            })
        );
    }

    public refreshShouldHappen(response: HttpErrorResponse): boolean {
        return response.status === 401;
    }

    public verifyTokenRequest(url: string): boolean {
        return url.endsWith('/refresh');
    }

    public login(loginModel: LoginModel): Observable<any> {
        return this.base
            .post('auth/login', loginModel)
            .pipe(tap((response: any) => {
                this.saveAccessData(response.token);
                this.saveRefreshToken(response.refreshToken);
            }));
    }

    public registrate(registerModel: RegisterModel): Observable<any> {
        return this.base.post('auth/register', registerModel);
    }

    public logout(): void {
        this.tokenStorage.clear();
    }

    public saveAccessDataPublic(token: string): void {
        this.tokenStorage.setAccessToken(token);
    }

    private saveAccessData(token: string): void {
        this.tokenStorage.setAccessToken(token);
    }

    private saveRefreshToken(token: string): void {
        this.tokenStorage.setRefreshToken(token);
    }
}
