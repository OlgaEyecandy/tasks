import { Component, OnInit } from '@angular/core';
import { ContactService } from './contacts.service';
import { UserService } from '../../../services/user.service';
import { Contact } from '../../../models/models';


@Component({
    selector: 'app-contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
    public id;
    public formData: Contact;
    public DataToSend = {
        contact: {},
        serviceIds: []
    };
    public numOfId;
    public services;
    public contactsList = [];
    public contactData;
    public contact;
    public button = false;
    constructor(
        private contactService: ContactService,
        public userService: UserService
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
            this.contactsList = data;
            return data;
        });
    }
    addContact(type: string, name: string, value: string) {
        const contact: Contact = {
            contact: value,
            id: null,
            name,
            type
        };
        this.contactService.createContact(this.id, contact).subscribe(id => {
            contact.id = id;
            this.contactsList.push(contact);
        });
    }
    changeContact(type: string, name: string, value: string, contact) {
        const newContact: Contact = {
            contact: value,
            id: null,
            name,
            type
        };
        this.contactService.contactChange(this.id, contact, newContact, contact.id).subscribe(id => {
            newContact.id = id;
        });
    }
    onDeleteContact(contact) {
        this.contactService.deleteContact(this.id, contact.id).subscribe(() => {
            const pos = this.contactsList.indexOf(contact);
            if (pos >= 0) {
                this.contactsList.splice(pos, 1);
            }
        });
    }
}
