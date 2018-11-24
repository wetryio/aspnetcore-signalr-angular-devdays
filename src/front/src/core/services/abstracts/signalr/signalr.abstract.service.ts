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
    return of(false);
  }

  /**
   * Stop SignalR process
   */
  protected stop() {
  }

  /**
   * Init SignalR Hub
   */
  private init() {
  }

  /**
   * Register receivers from Hub
   */
  private registerMethods() {
  }

  /**
   * Manage close event.
   * Restart process or not ?
   */
  private onClose(error: Error) {
  }

  /**
   * Send message to Hub
   */
  protected send(methodName: string, ...datas: any[]): Observable<any> {
    return of();
  }

}

export interface SignalrMethods {
  [key: string]: SignalrMethod;
}

export type SignalrMethod = (...args: any[]) => void;
