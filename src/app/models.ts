import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserModel {
    username: string;
    password: string;
}
export class Campaign {
    campaignUserId: number;
    id: number;
    name: string;
    status: string;
    services: Array<Service>;
    limit: number;
    userId: number;
    delete(){alert(`delete ${this.id}`)};
}
export class Service {
    campaignId: number;
    id: number;
    serviceId: number;
}
export class Contacts {
    type: string;
    name: string;
    value: string | number;
}