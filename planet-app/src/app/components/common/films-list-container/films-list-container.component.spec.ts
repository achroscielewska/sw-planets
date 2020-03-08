import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsListContainerComponent } from './planets-list-container.component';

describe('PlanetsListContainerComponent', () => {
  let component: PlanetsListContainerComponent;
  let fixture: ComponentFixture<PlanetsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetsListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
