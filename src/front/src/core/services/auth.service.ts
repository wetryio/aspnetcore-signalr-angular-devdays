import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseWebService } from './abstracts/base-web.service';
import { loginTokenKey } from './abstracts/signalr/signalr.core.service';

@Injectable()
export class AuthService extends BaseWebService {

    constructor(injector: Injector) {
        super(injector);
    }

    public login(name: string): Observable<any> {
        return this._post('/account', { userName: name })
            .pipe(
                tap(response => this.storeToken(response.accessToken))
            );
    }

    private storeToken(token: string): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(loginTokenKey, token);
        }
    }

}
