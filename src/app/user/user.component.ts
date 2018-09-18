import { Component, OnInit } from '@angular/core';
import { HttpPostService } from '../http/http-post.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  public username = localStorage.getItem('username');
constructor( public httpPostService: HttpPostService){

}
   ngOnInit() {
  }

}