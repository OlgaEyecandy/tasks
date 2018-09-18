import { Component} from '@angular/core';
import { HttpPostService } from '../http/http-post.service';
import { NgForm } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetInfoService } from '../http/get-info.service';
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent{

    constructor(
        public httpPostService: HttpPostService,
        public info: GetInfoService,
        private router: Router) 
        { }
        public userId;
    public signedIn = false;
    private url = 'http://194.84.30.29:3000/api/v1/login/';
    onSignIn(form: NgForm) {
        const httpOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        let body = new HttpParams().set("username", form.value.username).set("password", form.value.password).toString();
        console.log(body)
        this.httpPostService.postUrl(this.url, body, httpOptions).subscribe(data => {
            console.log('hi')
            console.log(data)
            let currUser = data.user;
            let currUsername = currUser.username;
            localStorage.setItem('username', currUsername);
            let currToken = data.token;
            localStorage.setItem('token', currToken);
            this.userId = currUser.id;
            this.signedIn = true;
            this.ifSigned()
        });
    }
    ifSigned(){
        if(this.signedIn){
           console.log(this.info.getInfo('http://194.84.30.29:3000/api/v1/profile/'));
            
           
    };
            this.router.navigateByUrl('/')
        }
}

