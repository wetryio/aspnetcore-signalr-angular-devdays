import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { BaseWebService } from '../../../core/services/abstracts/base-web.service';
import { loginTokenKey } from '../../../core/services/abstracts/signalr';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatUtilsService extends BaseWebService {

  constructor(injector: Injector) {
    super(injector);
  }

  private _getHeaders(): any {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(loginTokenKey)}`
    });
  }

  public getUsers(): Observable<User[]> {
    return this._get('/account', { headers: this._getHeaders() });
  }

}
