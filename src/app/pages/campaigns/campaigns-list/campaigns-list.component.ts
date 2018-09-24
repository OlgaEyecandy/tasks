import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Campaign } from '../../../models/campaign.model';
import { UserService } from '../../../services/user.service';
import { Service } from '../../../models/models';
import { CampaignService } from './campaign.service';
import { CampaignServicesService } from './campaign-service.service';


@Component({
    selector: 'app-campaigns-list',
    templateUrl: './campaigns-list.component.html',
    styleUrls: ['./campaigns-list.component.css']
})
export class CampaignsListComponent implements OnInit {
    public id: number;
    public campaignsList = [];
    public formData: Campaign;
    public DataToSend = {
        campaign: {},
        serviceIds: []
    };
    public numOfId;
    public services;
    public contactsList = [];
    public contactData;
    public contact;
    public button = false;
    constructor(
        public campaignService: CampaignService,
        private campaignServicesService: CampaignServicesService,
        public userService: UserService
    ) { }
    ngOnInit() {
        if (localStorage.getItem('token')) {
            this.getServices();
            this.getUserId()
                .then(userId => Promise.all([
                    this.getCampaigns(userId)
                ]));
        }
    }
    private getUserId(): Promise<number> {
        return this.userService.getProfile().then(data => {
            this.id = data.id;
            return data.id;
        });
    }
    private getCampaigns(userId: number): Promise<Array<Campaign>> {
        return this.campaignService.getAllCampaigns(userId).then(data => {
            this.campaignsList = data;
            this.campaignsList.forEach(item => {
                item.serviceName = this.campaignServicesService.getServiceName(item, this.services);
            });
            return data;
        });
    }
    getServiceNames(services: Array<Service>): string {
        return services.map(({ serviceId: id }) => this.getServiceNameById(id)).join();

    }
    private getServiceNameById(id: number): string {
        for (let i = 0; i < this.services.length; i++) {
            if (this.services[i].id === id) {
                return this.services[i].name;
            }
        }
    }
    private getServices(): Promise<Array<Service>> {
        return this.campaignServicesService.getAllServices().then(data => {
            this.services = data;
            this.numOfId = data.length;
            return data;
        });
    }
    createCampaign(form: NgForm) {
        this.formData = form.value;
        this.DataToSend.campaign = this.formData;
        this.DataToSend.serviceIds = [this.numOfId];
        this.button = false;
        return this.campaignService.postCampaign(this.id, this.DataToSend).subscribe((campaign) => {
            this.campaignsList.push(campaign);
        });
    }
    onDeleteCampaign(campaign) {
        this.campaignService.deleteCampaign(this.id, campaign.id).subscribe(() => {
            console.log(this.id);
            const pos = this.campaignsList.indexOf(campaign);
            if (pos >= 0) {
                this.campaignsList.splice(pos, 1);
            }
        });
    }
    ifCampaigns() {
        if (this.campaignsList.length > 0) {
            return true;
        }
        return false;
    }
}
