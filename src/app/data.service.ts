import { Injectable } from '@angular/core';
import { InfoModel } from './info.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
public url;
public listOfLinks = [];
public filesData: InfoModel[] = [];
  constructor() { 

  }
}
