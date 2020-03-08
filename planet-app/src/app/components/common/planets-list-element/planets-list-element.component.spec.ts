import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsListElementComponent } from './planets-list-element.component';

describe('ListElementComponent', () => {
  let component: PlanetsListElementComponent;
  let fixture: ComponentFixture<PlanetsListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetsListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
