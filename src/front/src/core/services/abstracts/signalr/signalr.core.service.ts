import { SignalRAbstractService, SignalrMethods } from './signalr.abstract.service';
import { environment } from '../../../../environments/environment';

export const loginTokenKey = 'devDaysToken';

export abstract class SignalRCoreService<T extends SignalrMethods> extends SignalRAbstractService<T> {

    protected baseUrl = environment.baseHubUrl;

    constructor() {
        super();
    }

    protected get loginToken(): string {
        if (typeof localStorage !== undefined) {
            return localStorage.getItem(loginTokenKey);
        }
    }

    protected logout(): void {
        localStorage.removeItem(loginTokenKey);
    }

}
