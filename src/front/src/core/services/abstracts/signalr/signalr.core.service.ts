import { SignalRAbstractService, SignalrMethods } from './signalr.abstract.service';
import { environment } from '../../../../environments/environment';

export const loginTokenKey = 'devDaysToken';

export abstract class SignalRCoreService<T extends SignalrMethods> extends SignalRAbstractService<T> {

    protected baseUrl = environment.baseHubUrl;
    protected connectionTryDelay = environment.connectionTryDelayDefault;

    constructor() {
        super();
    }

    protected get loginToken(): string {
        return null;
    }

    protected logout(): void {
    }

}
