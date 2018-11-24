import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HttpTransportType } from '@aspnet/signalr';

import { SignalrMethods, SignalrMethod } from './abstracts/signalr/signalr.abstract.service';
import { SignalRCoreService } from './abstracts/signalr/signalr.core.service';

interface QuoteMethods extends SignalrMethods {
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService extends SignalRCoreService<QuoteMethods> {

  protected url = '/quote';

  protected methods: QuoteMethods = {
  };

  /**
   * Start quote listening
   */
  public run(): Observable<string> {
    return of(null);
  }

  /**
   * Stop quote listening
   */
  public close() {
  }

}
