import { from, Observable, BehaviorSubject, timer, of } from 'rxjs';
import { retryWhen, delayWhen } from 'rxjs/operators';

import { HubConnectionBuilder, HubConnection, HttpTransportType, HttpError } from '@aspnet/signalr';

export abstract class SignalRAbstractService<T extends SignalrMethods> {

  private connection: HubConnection;
  public connected = new BehaviorSubject<boolean>(false);

  protected abstract baseUrl: string;
  protected abstract url: string;
  protected abstract methods: T;
  protected abstract connectionTryDelay: number;
  protected transport?: HttpTransportType;

  constructor() {
  }

  /**
   * Get token for secure connection
   */
  protected abstract get loginToken(): string;
  /**
   * Logout business
   */
  protected abstract logout(): void;

  /**
   * Start SignalR process
   */
  protected start(): Observable<any> {
    // return new Observable((observer) => {
    //   if (!this.connected.getValue()) {
    //     this.init();
    //     from(this.connection.start()).subscribe(
    //       () => {
    //         this.connected.next(true);
    //         observer.next(true);
    //       },
    //       () => {
    //         this.connected.next(false);
    //         observer.error(false);
    //       },
    //       () => observer.complete()
    //     );
    //   } else {
    //     console.warn('already connected');
    //     observer.next(false);
    //     observer.complete();
    //   }
    // }).pipe(
    //   retryWhen(errors => {
    //     return errors.pipe(delayWhen(val => timer(this.connectionTryDelay)));
    //   })
    // );
    return of(false);
  }

  /**
   * Stop SignalR process
   */
  protected stop() {
    // if (this.connection) {
    //   this.connection.stop();
    //   this.connection = null;
    // } else {
    //   console.warn('not connected yet');
    // }
  }

  /**
   * Init SignalR Hub
   */
  private init() {
    // if (!this.connection) {
    //   this.connection = new HubConnectionBuilder()
    //     .withUrl(`${this.baseUrl}${this.url}`, {
    //       accessTokenFactory: () => this.loginToken,
    //       ... ( this.transport ? { transport: this.transport } : {})
    //     })
    //     .build();
    //   this.registerMethods();
    // }
  }

  /**
   * Register receivers from Hub
   */
  private registerMethods() {
    // this.connection.onclose((error) => this.onClose(error));
    // for (const key in this.methods) {
    //   if (key) {
    //     this.connection.on(key, this.methods[key]);
    //   }
    // }
  }

  /**
   * Manage close event.
   * Restart process or not ?
   */
  private onClose(error: Error) {
    // this.connected.next(false);
    // // Will receive error if connection error but undefined if stop function is called
    // console.log('onClose', error);
    // if (error) {
    //   if (error instanceof HttpError || error.message.includes(' 1006 ')) {
    //     this.start().subscribe();
    //   } else {
    //     this.logout();
    //   }
    // }
  }

  /**
   * Send message to Hub
   */
  protected send(methodName: string, ...datas: any[]): Observable<any> {
    // return from(this.connection.send(methodName, ...datas));
    return of();
  }

}

export interface SignalrMethods {
  [key: string]: SignalrMethod;
}

export type SignalrMethod = (...args: any[]) => void;
