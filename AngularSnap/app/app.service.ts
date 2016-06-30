import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Snap} from "./Snap/snap";

@Injectable()
export class AppService {
    private appUrl = 'http://localhost:1401/';  // URL to web api

    constructor(private http: Http) { }
    getSnaps(): Promise<Snap[]> {
        return this.http.get(this.appUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(url: string) {
        return this.http.get(this.appUrl+'snap/?url='+url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}