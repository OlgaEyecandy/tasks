import { Component, OnInit } from '@angular/core';
import { InfoModel } from '../info.model';
import { GetFileService } from '../http.service';

@Component({
    selector: 'app-searchpage',
    templateUrl: './searchpage.component.html',
    styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
    public allAnswersToMessage = [];
    public dataFiles: InfoModel[] = [];
    public answer: InfoModel[] = [];
    public ifChClicked;
    public arr;
    constructor(private getFileService: GetFileService) { }
    ngOnInit() {
        this.getFileService.getUrl('/data/links.json').subscribe(data => this.handleLinks(data));
    }
    private handleLinks(data) {
        data.forEach(item => this.processFileData(item));
    }
    private processFileData(fileInfo) {
        this.getFileService.getUrl(`data/${fileInfo.file}`).subscribe(data => {
            let result = Object.assign({ url: fileInfo.file }, data);
            this.dataFiles.push(result);
        });
    }
    private getMessagesArray(arr) {
        return arr.reduce((acc, val) => acc.concat(val));
    }
    private ifEmpty(value) {
        return (value.length > 0);
    }
    public sortData(elem) {
        if (this.ifEmpty(elem)) {
            this.answer = this.dataFiles.filter((item) => {
                for (let key in item) {
                    if (key == elem) {
                        return true;
                    } else if (item[key] == elem) {
                        return true;
                    } else {
                    }
                }
            })

            if (this.ifChClicked) {
                this.allAnswersToMessage.push(this.answer);
                this.arr = this.getMessagesArray(this.allAnswersToMessage);
            } else {
                this.arr = this.answer;
            }
            this.getFileService.postUrl("http://194.84.30.29:3000/api/v1/login/", this.arr)
        }



    }
    public checkboxClick(n) {
        this.ifChClicked = n;
    }
}