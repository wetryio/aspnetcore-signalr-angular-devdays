import { from, of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

export abstract class SignalRAbstractService {

  private connection: HubConnection;
  private connected: boolean;

  protected baseUrl: string;
  protected url: string;
  protected methods: {[key: string]: (...args: any[]) => void};

  constructor() {}

  protected abstract get loginToken(): string;

  protected start() {
    if (!this.connected) {
      this.init();
      return from(this.connection.start()).pipe(tap(
        () => this.connected = true,
        () => this.connected = false
      ));
    } else {
      console.warn('already connected');
      return of(null);
    }
  }

  protected stop() {
    if (this.connection/* && this.connected*/) {
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
    this.connection.onclose(() => this.connected = false);
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
