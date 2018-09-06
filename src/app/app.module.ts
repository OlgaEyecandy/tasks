import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchfieldComponent} from './searchpage/searchfield/searchfield.component';
import { AnswerfieldComponent } from './searchpage/answerfield/answerfield.component';
import { FooterComponent } from './footer/footer.component';
import { InfoModel } from './info.model';
import { SearchpageComponent } from './searchpage/searchpage.component'
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SearchfieldComponent,
        AnswerfieldComponent,
        FooterComponent,
        SearchpageComponent
    ],
    imports: [
        BrowserModule, 
        HttpClientModule
    ],
    bootstrap: [AppComponent],
    providers: [InfoModel]
})
export class AppModule { }
