import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmsListContainerComponent } from './films-list-container.component';


describe('PlanetsListContainerComponent', () => {
  let component: FilmsListContainerComponent;
  let fixture: ComponentFixture<FilmsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
