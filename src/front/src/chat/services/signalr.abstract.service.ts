import { from, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

export abstract class SignalRAbstractService {

  private connection: HubConnection;
  private connected: boolean;

  protected url: string;
  protected methods: {[key: string]: (...args: any[]) => void};

  constructor() {}

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
    if (this.connection && this.connected) {
      this.connection.stop();
    } else {
      console.warn('not connected yet');
    }
  }

  private init() {
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl(this.url)
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

}
