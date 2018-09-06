import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GetFileService {

    constructor(private httpClient: HttpClient) { }

    public getUrl(url: string): Observable<any> {
        return this.httpClient.get(url);
    }
    public postUrl(url:string, body:any):  Observable<any> {
        return this.httpClient.post(url, body);
    }
}
