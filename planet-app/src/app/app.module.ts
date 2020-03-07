import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NoContentComponent,
  HeaderComponent,
  PlanetsListComponent } from './components/index';
import { ListElementComponent } from './components/common/list-element/list-element.component';
import { ListComponent } from './components/common/list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanetsListComponent,
    NoContentComponent,
    HeaderComponent,
    ListElementComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
