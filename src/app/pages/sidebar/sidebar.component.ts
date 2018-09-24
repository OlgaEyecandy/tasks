import { Component } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';



@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'scaleX(0)', opacity: '0' }),
                animate('300ms ease-in', style({ transform: 'scaleX(1)', opacity: '1' }))
            ])
        ])
        ,
        trigger('changeWidth', [
            state('true', style({ width: '200px' })),
            state('false', style({ width: '0px' })),
            transition('* <=> *', animate(300))
        ])
    ]
})
export class SidebarComponent {
    public username;
    isMenuOpen = false;
    animationState = 'in';
    isSignIn() {
        if (localStorage.getItem('token')) {
            this.username = localStorage.getItem('username');
            return true;
        } else {
            return false;
        }
    }
    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }

    toggleShowDiv(divName: string) {
        if (divName === 'divA') {
            this.animationState = this.animationState === 'out' ? 'in' : 'out';
        }
    }
}
