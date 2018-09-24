import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
    @Input() showSidebar;
    public userId: number;

    ngOnInit() {

    }

}
