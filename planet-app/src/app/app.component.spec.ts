import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
  LoaderComponent,
  FilmsListContainerComponent,
  ResidentsListContainerComponent
} from './components/common/index';
import { PlanetsService } from './services/planets.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule.forRoot([]),
        FormsModule
      ],
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
      providers: [
        HttpClient,
        PlanetsService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
