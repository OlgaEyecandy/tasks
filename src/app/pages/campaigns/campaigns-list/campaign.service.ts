import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../../../models/campaign.model';

@Injectable({
    providedIn: 'root'
})
export class CampaignService {
    constructor(private httpClient: HttpClient) { }
    getAllCampaigns(userId: number): Promise<Array<Campaign>> {
        return this.httpClient.get<Array<Campaign>>(`http://194.84.30.29:3000/api/v1/users/${userId}/campaigns/`)
            .toPromise()
            .then(data => data.map(campaign => new Campaign(campaign)));
    }
    postCampaign(userId: number, body): Observable<any> {
        return this.httpClient.post<any>(`http://194.84.30.29:3000/api/v1/users/${userId}/campaigns/`, body);

    }
    deleteCampaign(userId: number, campaignId: number): Observable<any> {
        return this.httpClient
        .delete<any>(`http://194.84.30.29:3000/api/v1/users/${userId}/campaigns/${campaignId}?services=${campaignId}`);
    }
}

