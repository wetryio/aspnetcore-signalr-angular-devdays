import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export class BaseWebService {

    protected baseUrl = environment.baseApiUrl;

    protected http: HttpClient;

    constructor(protected injector: Injector) {
        this.http = injector.get(HttpClient);
    }

    private generateUrl(subUrl: string): string {
        return `${this.baseUrl}${subUrl}`;
    }

    protected _post(url: string, body: any, options?: any): Observable<any> {
        return this.http.post(this.generateUrl(url), body, options);
    }

    protected _get(url: string, options?: any): Observable<any> {
        return this.http.get(this.generateUrl(url), options);
    }

}
