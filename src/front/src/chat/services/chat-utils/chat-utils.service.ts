import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

import { BaseWebService } from '../../../core/services/abstracts/base-web.service';
import { loginTokenKey } from '../../../core/services/abstracts/signalr/signalr.core.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatUtilsService extends BaseWebService {

  constructor(injector: Injector) {
    super(injector);
  }

  private getHeaders(): any {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(loginTokenKey)}`
    });
  }

  public getUsers(): Observable<User[]> {
    return this._get('/account', { headers: this.getHeaders() });
  }

  public getGroups(): Observable<any> {
    return this._get('/groups', { headers: this.getHeaders() });
  }

}
