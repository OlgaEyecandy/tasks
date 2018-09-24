import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserComponent } from './pages/user/user.component';
import { CampaignsListComponent } from './pages/campaigns/campaigns-list/campaigns-list.component';
import { EmailAlertComponent } from './pages/campaigns/campaigns-list/campaign-services/email-alerts/email-alerts.component';
import { QuestionnaireComponent } from './pages/campaigns/campaigns-list/campaign-services/questionnaire/questionnaire.component';


const appRoutes: Routes = [
    { path: '', component: CampaignsComponent, canActivate: [AuthGuard] },
    { path: 'campaigns', component: CampaignsListComponent, canActivate: [AuthGuard] },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'EMAIL_ALERTS', component: EmailAlertComponent, canActivate: [AuthGuard] },
    { path: 'QUESTIONNAIRE', component: QuestionnaireComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
