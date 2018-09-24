import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

    constructor(
        public httpClient: HttpClient,
        public info: UserService,
        private router: Router) { }
    public userId;
    public signedIn = false;
    onSignIn(form: NgForm) {
        const httpOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const body = new HttpParams()
            .set('username', form.value.username)
            .set('password', form.value.password).toString();
        this.httpClient
            .post<UserModel>('http://194.84.30.29:3000/api/v1/login/', body, httpOptions)
            .subscribe(data => {
                localStorage.setItem('username', data.user.username);
                localStorage.setItem('token', data.token);
                this.signedIn = true;
                this.ifSigned();
            });
    }
    ifSigned() {
        if (this.signedIn) {
            this.router.navigateByUrl('/');
        }
    }
}

