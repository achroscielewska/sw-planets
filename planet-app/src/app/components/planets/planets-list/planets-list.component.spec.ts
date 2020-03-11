import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanetsListComponent } from '..';
import { HttpClientModule } from '@angular/common/http';
import { PlanetsService } from 'src/app/services/planets.service';

describe('PlanetsListComponent', () => {
  let component: PlanetsListComponent;
  let fixture: ComponentFixture<PlanetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PlanetsListComponent],
      providers: [PlanetsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
