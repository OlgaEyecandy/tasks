import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DataSend {
    campaign: any;
    serviceIds: Array<number>;
    serviceLimitations: Object;
}
export class Service {
    campaignId: number;
    id: number;
    serviceId: number;
}
export class Contact {
    id: number;
    type: string;
    name: string;
    contact: string;
}
