import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanetsService } from 'src/app/services/planets.service';
import { PlanetsDto, Planet } from 'src/app/dto';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {
  planets$: Observable<PlanetsDto>;

  planetsToDisplay: Planet[] = [];
  count: number;
  previousPage: number | null;
  nextPage: number | null;
  firstPage = 1;

  noPlanetsToDisplay = 10;

  constructor(private planetsService: PlanetsService) { }

  ngOnInit() {
    this.getDataToDisplay(this.firstPage);
  }

  getDataToDisplay(pageToGet: number) {
    this.planets$ = this.planetsService.getPlanetsList$(pageToGet);
    this.planets$.subscribe(data => {
      this.planetsToDisplay = data.results;
      this.count = data.count;

      if (data.previous) {
        this.previousPage = pageToGet - 1;
      }

      if (data.next) {
        this.nextPage = pageToGet + 1;
      }
    });
  }

  goToPrevPage() {
    this.getDataToDisplay(this.previousPage);
  }

  goToNextPage() {
    this.getDataToDisplay(this.nextPage);
  }

  changeNoPlanetsToDisplay(numberOfItems: number) {
    const currentNoOfElements = this.planetsToDisplay.length;
    if (currentNoOfElements === numberOfItems) {
      return;
    }

    if (currentNoOfElements > numberOfItems) {
      this.planetsToDisplay = this.planetsToDisplay.slice(0, numberOfItems);
    }

  }

}
