import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../../contacts-list/contacts.service';
import { UserService } from '../../../../../../services/user.service';
import { Contact } from '../../../../../../models/models';

@Component({
    selector: 'app-services-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ServicesContactsComponent implements OnInit {
    public contactList = [];
    public id;
    constructor(
        private contactService: ContactService,
        private userService: UserService
    ) { }
    ngOnInit() {
        if (localStorage.getItem('token')) {
            this.getUserId()
                .then(userId => Promise.all([
                    this.getContacts(userId)
                ]));
        }
    }
    private getUserId(): Promise<number> {
        return this.userService.getProfile().then(data => {
            this.id = data.id;
            return data.id;
        });
    }
    private getContacts(userId: number): Promise<Array<Contact>> {
        return this.contactService.getAllContacts(userId).then(data => {
            this.contactList = data;
            return data;
        });
    }

}
