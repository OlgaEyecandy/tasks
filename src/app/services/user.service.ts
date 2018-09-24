import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userProfile: Promise<UserProfile>;
    constructor(private httpClient: HttpClient) { }
    getProfile(): Promise<UserProfile> {
        if (this.userProfile == null) {
            this.userProfile = this.httpClient.get<UserProfile>('http://194.84.30.29:3000/api/v1/profile/').toPromise();
        }
        return this.userProfile;
    }
}
