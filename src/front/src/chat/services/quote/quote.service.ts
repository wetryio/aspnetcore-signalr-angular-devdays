import { Injectable, Injector } from '@angular/core';
import { SignalrMethods, SignalrMethod } from '../signalr.abstract.service';
import { SignalRCoreService } from '../signalr.core.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { HttpTransportType } from '@aspnet/signalr';

interface ChatMethods extends SignalrMethods {
  UpdateQuote: SignalrMethod;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService extends SignalRCoreService<ChatMethods> {

  private _quoteReceiver = new Subject<string>();
  public quoteReceiver = this._quoteReceiver.asObservable();

  protected url = '/quote';
  protected transport = HttpTransportType.LongPolling;

  protected methods: ChatMethods = {
    UpdateQuote: (quote) => {
      console.log('update quote', quote);
      this._quoteReceiver.next(quote);
    }
  };

  public run(): Observable<string> {
    return this.start().pipe(
      switchMap(() => this.quoteReceiver)
    );
  }

}
