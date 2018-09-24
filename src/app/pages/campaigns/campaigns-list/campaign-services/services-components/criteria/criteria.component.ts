import {  Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-services-criteria',
    templateUrl: './criteria.component.html',
    styleUrls: ['./criteria.component.css']
  })
export class ServicesCriteriaComponent {
    constructor(private httpClient: HttpClient) { }
    onTest() {
        this.httpClient.get('http://194.84.30.29:3000/app/modules/criterion_test/template.html?896');
    }
}
