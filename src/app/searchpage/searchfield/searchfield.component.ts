import { Component, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'app-searchfield',
    templateUrl: './searchfield.component.html',
    styleUrls: ['./searchfield.component.css']
})
export class SearchfieldComponent{
    public checkboxChecked = false;
    @Output() searchSmth: EventEmitter<any> = new EventEmitter();
    @Output() checkboxClick: EventEmitter<any> = new EventEmitter();
    public searchClick(value) {
        this.searchSmth.emit(value);
    };
    public ifCheckboxChecked() {
        this.checkboxChecked = !this.checkboxChecked;
        this.checkboxClick.emit(this.checkboxChecked);
    };
}