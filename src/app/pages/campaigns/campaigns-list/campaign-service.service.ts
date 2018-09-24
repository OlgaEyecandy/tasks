import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../../models/models';

@Injectable({
    providedIn: 'root'
})
export class CampaignServicesService {
    constructor(private httpClient: HttpClient) { }
    getAllServices(): Promise<Array<Service>> {
        return this.httpClient.get<Array<Service>>(`http://194.84.30.29:3000/api/v1/services/`).toPromise();
    }
    getServiceName(campaign, services) {
        campaign.services.forEach(service => {
            const serveId = service.serviceId;
            services.forEach(item => {
                if (item.id === serveId) {
                    const serviceName = item.name;
                    return serviceName;
                }
            });
        });
    }
}
