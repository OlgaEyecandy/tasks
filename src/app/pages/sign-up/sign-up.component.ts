import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HttpParams, HttpClient } from '@angular/common/http';
import { UserObject } from '../../models/user.model';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    public showExtra = false;
    public user: UserObject;
    constructor(public httpClient: HttpClient) { }
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
            return this.onSignUp(username, password);
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
        console.log(username, password);
        const body = new HttpParams().set('username', username).set('password', password);
        this.httpClient.post(this.url, body, httpOptions).subscribe();
    }
}
