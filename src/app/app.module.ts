import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';

import { HttpInterceptorService } from './services/http-interceptor.service';

import { AppComponent } from './app.component';

import { CampaignService } from './pages/campaigns/campaigns-list/campaign.service';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { UserComponent } from './pages/user/user.component';
import { CampaignsListComponent } from './pages/campaigns/campaigns-list/campaigns-list.component';
import { ContactsListComponent } from './pages/campaigns/contacts-list/contacts-list.component';
import { EmailAlertComponent } from './pages/campaigns/campaigns-list/campaign-services/email-alerts/email-alerts.component';
import { QuestionnaireComponent } from './pages/campaigns/campaigns-list/campaign-services/questionnaire/questionnaire.component';
import {
    ServicesContactsComponent
} from './pages/campaigns/campaigns-list/campaign-services/services-components/contacts/contacts.component';
import {
    ServicesCriteriaComponent
} from './pages/campaigns/campaigns-list/campaign-services/services-components/criteria/criteria.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';





@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        SignInComponent,
        SignUpComponent,
        CampaignsComponent,
        UserComponent,
        CampaignsListComponent,
        ContactsListComponent,
        EmailAlertComponent,
        QuestionnaireComponent,
        ServicesContactsComponent,
        ServicesCriteriaComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [AuthGuard, CampaignService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
