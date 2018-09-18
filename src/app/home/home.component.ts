import { Component, OnInit, Input } from '@angular/core';
import { HttpPostService } from '../http/http-post.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    @Input() showSidebar;
    public userId:number;
    constructor(public httpService: HttpPostService) { }

    ngOnInit() {
       
    }

}
