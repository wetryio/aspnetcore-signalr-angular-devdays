import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HttpTransportType } from '@aspnet/signalr';

import { SignalrMethods, SignalrMethod } from './abstracts/signalr/signalr.abstract.service';
import { SignalRCoreService } from './abstracts/signalr/signalr.core.service';

interface QuoteMethods extends SignalrMethods {
  UpdateQuote: SignalrMethod;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService extends SignalRCoreService<QuoteMethods> {

  private _quoteReceiver = new Subject<string>();
  public quoteReceiver = this._quoteReceiver.asObservable();

  protected url = '/quote';
  protected transport = HttpTransportType.LongPolling;
  protected connectionTryDelay = 10000;

  protected methods: QuoteMethods = {
    UpdateQuote: (quote) => {
      this._quoteReceiver.next(quote);
    }
  };

  public run(): Observable<string> {
    return this.start().pipe(
      switchMap(() => this.quoteReceiver)
    );
  }

  public close() {
    this.stop();
  }

  public updateQuote() {
    this.send('UpdateQuote');
  }

}
