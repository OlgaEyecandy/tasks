import {
    trigger, state, style, transition,
    animate, group
} from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'transform': 'translateX(0%)'
        })),
        state('out', style({
            'transform': 'translateX(-100%)'
        })),
        transition('in => out', [group([
            animate('300ms ease-in', style({
                'transform': 'translateX(-100%)'
            }))
        ]
        )]),
        transition('out => in', [group([
            animate('300ms ease-in', style({
                'transform': 'translateX(0%)'
            }))
        ]
        )])
    ]),
]