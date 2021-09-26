import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const accessToken = 'accessToken';
const refreshToken = 'refreshToken';

@Injectable()
export class TokenStorage {
    public getAccessToken(): Observable<string> {
        const token: string = localStorage.getItem(accessToken) ?? '';
        return of(token);
    }

    public getRefreshToken(): Observable<string> {
        const token: string = localStorage.getItem(refreshToken) ?? '';
        return of(token);
    }

    public setAccessToken(token: string): TokenStorage {
        localStorage.setItem(accessToken, token);
        return this;
    }

    public setRefreshToken(token: string): TokenStorage {
        localStorage.setItem(refreshToken, token);
        return this;
    }

    public clear(): void {
        localStorage.setItem(accessToken, '');
        localStorage.setItem(refreshToken, '');
    }
}
