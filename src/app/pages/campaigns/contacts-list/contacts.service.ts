import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../../models/models';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    constructor(private httpClient: HttpClient) { }
    getAllContacts(userId: number): Promise<Array<Contact>> {
        return this.httpClient.get<Array<Contact>>(`http://194.84.30.29:3000/api/v1/users/${userId}/contacts/`).toPromise();
    }
    createContact(userId: number, contact: Contact): Observable<number> {
        const oldContact: Contact = {
            id: contact.id,
            contact: contact.contact,
            name: contact.name,
            type: contact.type
        };
        return this.changeContact(userId, oldContact, contact);
    }
    changeContact(userId: number, contact: Contact, newContact: Contact): Observable<number> {
        const body = {
            userId,
            contact: newContact.contact,
            oldContact: contact.contact,
            name: newContact.name,
            oldName: contact.name,
            type: newContact.type,
            oldType: contact.type
        };
        return this.httpClient.post<number>(`http://194.84.30.29:3000/api/v1/users/${userId}/contacts/`, body);
    }
    contactChange(userId: number, contact: Contact, newContact: Contact, contactId: number): Observable<number> {
        const body = {
            userId,
            contact: newContact.contact,
            oldContact: contact.contact,
            name: newContact.name,
            oldName: contact.name,
            type: newContact.type,
            oldType: contact.type
        };
        return this.httpClient.put<number>(`http://194.84.30.29:3000/api/v1/users/${userId}/contacts/${contactId}`, body);
    }
    deleteContact(userId: number, contactId: number): Observable<any> {
        return this.httpClient
            .delete<any>(`http://194.84.30.29:3000/api/v1/users/${userId}/contacts/${contactId}`);
    }
}
