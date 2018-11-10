import { from, Observable, BehaviorSubject } from 'rxjs';

import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

export abstract class SignalRAbstractService<T extends SignalrMethods> {

  private connection: HubConnection;
  public connected = new BehaviorSubject<boolean>(false);

  protected baseUrl: string;
  protected url: string;
  protected methods: T;

  constructor() {}

  protected abstract get loginToken(): string;

  protected start() {
    return new Observable((observer) => {
      if (!this.connected.getValue()) {
        this.init();
        from(this.connection.start()).subscribe(
          () => {
            this.connected.next(true);
            observer.next(true);
          },
          () => {
            this.connected.next(false);
            observer.error(false);
          },
          () => observer.complete()
        );
      } else {
        console.warn('already connected');
        observer.next(false);
        observer.complete();
      }
    });
  }

  protected stop() {
    if (this.connection/* && this.connected.getVaule()*/) {
      this.connection.stop();
      this.connection = null;
    } else {
      console.warn('not connected yet');
    }
  }

  private init() {
    // https://docs.microsoft.com/en-us/aspnet/core/signalr/authn-and-authz?view=aspnetcore-2.1
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl(`${this.baseUrl}${this.url}`, { accessTokenFactory: () => this.loginToken })
        .build();
      this.registerMethods();
    }
  }

  private registerMethods() {
    this.connection.onclose(() => this.connected.next(false));
    for (const key in this.methods) {
      if (key) {
        this.connection.on(key, this.methods[key]);
      }
    }
  }

  public send(methodName: string, message: any): Observable<any> {
    return from(this.connection.send(methodName, message));
  }

}

export interface SignalrMethods {
  [key: string]: SignalrMethod;
}

export type SignalrMethod = (...args: any[]) => void;
