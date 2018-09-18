import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpPostService } from '../http/http-post.service';
import { HttpParams } from '@angular/common/http';
import { UserModel } from '../models';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    public showExtra = false;
    public user:UserModel
    constructor(public httpPostService: HttpPostService) { }
    //private url = 'http://194.84.30.29:3000/api/v1/registration/';
    private url;
    ngOnInit() {
    }
    onCheckPassword(form: NgForm) {
        const username = form.value.username;
        const password = form.value.password;
        const repeatPassword = form.value.repeatPassword;
        this.user.username = username;
        this.user.password = password;
        if (password === repeatPassword) {
            this.showExtra = false;
            return this.onSignUp(username, password)
        } else {
            return this.showExtra = true;
        }
    }
    onSignUp(username, password) {
        const httpOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        console.log(username, password)
        let body = new HttpParams().set("username", username).set("password", password);
        this.httpPostService.postUrl(this.url, body, httpOptions).subscribe(data => console.log(data));
    }
}
