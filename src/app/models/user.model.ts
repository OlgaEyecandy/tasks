import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserModel {
    user: UserObject;
    token: string;
}
export class UserObject {
    username: string;
    password: string;
}
