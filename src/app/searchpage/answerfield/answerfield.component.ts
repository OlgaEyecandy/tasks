import { Component, Input } from '@angular/core';
import { InfoModel } from '../../info.model';

@Component({
    selector: 'app-answerfield',
    templateUrl: './answerfield.component.html',
    styleUrls: ['./answerfield.component.css']
})

export class AnswerfieldComponent {
    @Input() arr: InfoModel[];
}
