import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InfoModel {
    age: string;
    carrier: string;
    id: string;
    imageUrl: string;
    name: string;
}