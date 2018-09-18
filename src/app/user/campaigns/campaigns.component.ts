import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpPostService } from '../../http/http-post.service';
import { Campaign } from '../../models';
import { Router } from '@angular/router';
@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
    public campaignsList = [];
    public contactsList = [];
    public contactData;
    public contact;
    public data;
    public formData;
    public DataToSend = {
        campaign: {},
        serviceIds: [],
        serviceLimitations: {}
    };
    private sumOfIds;
    public campaignData;
    public userId: number;
    public button = false;
    constructor(public httpPost: HttpPostService, private router: Router
    ) { };
    ngOnInit() {
        if (localStorage.getItem('token')) {

            this.httpPost.getUrl('http://194.84.30.29:3000/api/v1/profile/').subscribe(data => {
                let userId = data.id;
                this.httpPost.getUrl(`http://194.84.30.29:3000/api/v1/users/${userId}/contacts/`).subscribe(data => {
                    this.contactsList = data
                    return
                });
                this.httpPost.getUrl(`http://194.84.30.29:3000//api/v1/services/`);
                this.httpPost.getUrl(`http://194.84.30.29:3000/api/v1/users/${userId}/campaigns/`).subscribe(data => {
                    this.campaignsList = data;
                    return
                })
            })
        }
    }
    createCampaign(form: NgForm) {
        this.formData = form.value;
        console.log(this.formData);
        this.campaignData = {
            id: null,
            userId: null,
            name: this.formData.name,
            status: this.formData.status,
            services: [],
            limit: this.formData.limit
        }
        console.log(this.campaignData);
        this.DataToSend.campaign = this.campaignData;
        this.sumOfIds = [2];
        this.DataToSend.serviceIds = this.sumOfIds;
        console.log(this.DataToSend);
        this.button = false;
        return this.postCampaign(this.DataToSend);
    }

    postCampaign(b) {
        let body = b;
        const httpOpts = {
        };
        return this.httpPost.postUrl("http://194.84.30.29:3000/api/v1/users/12/campaigns/", body, httpOpts).subscribe(data => console.log(data));

    }
    deleteCampaign(campaign) {
        let campId = campaign.id;
        return this.httpPost.deleteUrl(`http://194.84.30.29:3000/api/v1/users/12/campaigns/${campId}?services=${campId}`).subscribe(data => console.log(data))
    }
    ifCampaigns() {
        if (this.campaignsList.length > 0) {
            return true
        } else {
            return false
        }
    }

    createContact(f: NgForm) {
        console.log(f);
        this.contactData = f.value;
        console.log(this.contactData);
        this.contact = {
            id: null,
            userId: null,
            name: this.contactData.name,
            value: this.contactData.value
        }
        console.log(this.contactData);
        
    }
}