import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDetailsComponent } from './planet-details.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanetsService } from 'src/app/services/planets.service';
import { RouterModule } from '@angular/router';

describe('PlanetDetailsComponent', () => {
  let component: PlanetDetailsComponent;
  let fixture: ComponentFixture<PlanetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([])],
      declarations: [ PlanetDetailsComponent ],
      providers: [PlanetsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
