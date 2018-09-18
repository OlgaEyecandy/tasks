import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SlideInOutAnimation } from './animation';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [SlideInOutAnimation
        /* trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('1000ms ease-in', style({ transform: 'translateX(0%)' }))
            ]),
            transition(':leave', [
                animate('1000ms ease-in', style({ transform: 'translateX(-100%)' }))
            ])
        ]),
        trigger('slideDiv', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)' }),
                animate('1000ms ease-in', style({ transform: 'translateX(0%)' }))
            ]),
            transition(':leave', [
                animate('1000ms ease-in', style({ transform: 'translateX(-100%)' }))
            ])
        ]) */
    ]
})
export class AppComponent {
    title = 'task';
    isMenuOpen = false;
    public username;
    animationState = 'in';
    toggleShowDiv(divName: string) {
        if (divName === 'divA') {
            this.animationState = this.animationState === 'out' ? 'in' : 'out';
        }
    }

    isSignIn() {
        if (localStorage.getItem('token')) {
            this.username = localStorage.getItem('username');
            return true
        } else {
            return false
        }
    }
    onLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
}
