import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HttpTransportType } from '@aspnet/signalr';

import { SignalrMethods, SignalrMethod } from './abstracts/signalr/signalr.abstract.service';
import { SignalRCoreService } from './abstracts/signalr/signalr.core.service';

interface QuoteMethods extends SignalrMethods {
  // UpdateQuote: SignalrMethod;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService extends SignalRCoreService<QuoteMethods> {

  // private _quoteReceiver = new Subject<string>();
  // public quoteReceiver = this._quoteReceiver.asObservable();

  protected url = '/quote';
  // protected transport = HttpTransportType.LongPolling;
  // protected connectionTryDelay = 10000;

  protected methods: QuoteMethods = {
    // UpdateQuote: (quote) => this._quoteReceiver.next(quote)
  };

  /**
   * Start quote listening
   */
  public run(): Observable<string> {
    // return this.start().pipe(
    //   switchMap(() => this.quoteReceiver)
    // );
    return of(null);
  }

  /**
   * Stop quote listening
   */
  public close() {
    // this.stop();
  }

}
