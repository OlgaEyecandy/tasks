import { Injectable, OnInit } from '@angular/core';
import { HttpPostService } from './http-post.service';

@Injectable({
    providedIn: 'root'
})
export class GetInfoService implements OnInit {
    public dataObj = {
        id: null
    };
    constructor(public httpPostService: HttpPostService) { }
    ngOnInit() {
    }
    getInfo(url: string) {
        this.httpPostService.getUrl(url).subscribe(data => {
            this.dataObj = data;
            console.log(this.dataObj.id);
        })
        return
    }
}
