import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResidentsListContainerComponent } from './residents-list-container.component';


describe('ResidentsListContainerComponent', () => {
  let component: ResidentsListContainerComponent;
  let fixture: ComponentFixture<ResidentsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidentsListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
