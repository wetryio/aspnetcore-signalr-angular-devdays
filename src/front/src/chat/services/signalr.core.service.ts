import { SignalRAbstractService } from './signalr.abstract.service';
import { environment } from '../../environments/environment';

export const loginTokenKey = 'devDaysToken';

export abstract class SignalRCoreService extends SignalRAbstractService {

    protected baseUrl = environment.baseHubUrl;

    constructor() {
        super();
    }

    protected get loginToken(): string {
        if (typeof localStorage !== undefined) {
            return localStorage.getItem(loginTokenKey);
        }
    }

}
