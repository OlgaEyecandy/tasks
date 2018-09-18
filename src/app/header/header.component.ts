import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';
import { HttpPostService } from '../http/http-post.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
    public clicked = false;
    public menuClicked = false;
    @Output() menuClick: EventEmitter<any> = new EventEmitter();
    ngOnInit() {
    }
    public menuOnClick() {
        this.menuClicked = !this.menuClicked;
        this.menuClick.emit(this.menuClicked);
    }
   
}
