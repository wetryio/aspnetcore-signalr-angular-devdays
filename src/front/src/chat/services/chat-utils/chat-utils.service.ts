import { Injectable, Injector } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BaseWebService } from '../../../core/services/abstracts/base-web.service';
import { loginTokenKey } from '../../../core/services/abstracts/signalr';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatUtilsService extends BaseWebService {

  private router: Router;

  constructor(injector: Injector) {
    super(injector);
    this.router = injector.get(Router);
  }

  private _getHeaders(): any {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(loginTokenKey)}`
    });
  }

  public getUsers(): Observable<User[]> {
    return this._get('/account', { headers: this._getHeaders() }).pipe(
      tap(undefined, error => this.removeToken(error))
    );
  }

  private removeToken(error: HttpErrorResponse): void {
    if (error && error.status === 401) {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(loginTokenKey);
        }
        this.router.navigate(['/auth']);
    }
  }

}
