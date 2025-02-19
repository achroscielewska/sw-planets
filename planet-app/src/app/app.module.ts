import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NoContentComponent,
  HeaderComponent
} from './components/index';
import {
  PlanetsListComponent,
  PlanetDetailsComponent
} from './components/planets/index';
import {
  PlanetsListContainerComponent,
  PlanetsListElementComponent,
  FilmsListContainerComponent,
  ResidentsListContainerComponent,
  LoaderComponent
} from './components/common/index';

@NgModule({
  declarations: [
    AppComponent,
    PlanetsListComponent,
    NoContentComponent,
    HeaderComponent,
    PlanetsListElementComponent,
    PlanetsListContainerComponent,
    PlanetDetailsComponent,
    FilmsListContainerComponent,
    ResidentsListContainerComponent,
    LoaderComponent
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
