import { Injectable } from '@angular/core';
import { Service } from './models';

@Injectable({
    providedIn: 'root'
})

export class Campaign {
    campaignUserId: number;
    id: number;
    name: string;
    status: string;
    services: Array<Service>;
    limit: number;
    userId: number;
    serviceName?: string;
    constructor(data) {
        this.campaignUserId = data.campaignUserId;
        this.id = data.id;
        this.name = data.name;
        this.status = data.status;
        this.services = data.services;
        this.limit = data.limit;
        this.userId = data.userId;
    }
}
