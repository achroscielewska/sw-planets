import { Component, OnInit } from '@angular/core';

import { PlanetsDto, Planet } from 'src/app/dto';
import { PlanetsService } from 'src/app/services/planets.service';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {
  planetsToDisplay: Planet[] = [];

  maxNumberOfListEl: number;
  maxNumberOfElPerPage: number;
  numberOfFetchedEl: number;
  nextPageToFetch = 1;

  noElementsPerPage = 10;
  arrElementsPerPage = [5, 10, 25, 100];
  sliceBegin = 0;
  sliceEnd = 0;

  constructor(private planetsService: PlanetsService) { }

  ngOnInit() {
    this.initPlanetList();
  }

  onChangeNoElements(newValue) {
    this.noElementsPerPage = +newValue;
    this.sliceEnd = this.sliceBegin + this.noElementsPerPage;

    if (this.sliceEnd > this.numberOfFetchedEl && this.maxNumberOfListEl > this.numberOfFetchedEl) {
      this.fetchMoreElements();
    }
  }

  private initPlanetList() {
    this.planetsService.getPlanetsList(this.nextPageToFetch)
      .subscribe(
        (result: PlanetsDto) => {
          this.maxNumberOfListEl = result.count;
          this.maxNumberOfElPerPage = result.results.length;

          this.setUpSliceList();
          this.setUpListElementsView(result.results);
        },
        (err) => console.error(err)
      );
  }

  private setUpSliceList() {
    this.sliceBegin = this.sliceEnd;
    this.sliceEnd = this.sliceBegin + this.noElementsPerPage;
  }

  private setUpListElementsView(results: Planet[]) {
    this.planetsToDisplay.push(...results);
    this.numberOfFetchedEl = this.planetsToDisplay.length;
    this.nextPageToFetch++;

    if (this.sliceEnd > this.numberOfFetchedEl && this.maxNumberOfListEl > this.numberOfFetchedEl) {
      this.fetchMoreElements();
    }
  }

  private fetchMoreElements() {
    this.planetsService.getPlanetsList(this.nextPageToFetch)
      .subscribe(
        (result: PlanetsDto) => {
          this.setUpListElementsView(result.results);
        },
        (err) => console.error(err)
      );
  }

  goToNextPage() {
    this.setUpSliceList();
    if (this.sliceEnd > this.numberOfFetchedEl && this.maxNumberOfListEl > this.numberOfFetchedEl) {
      this.fetchMoreElements();
    }
  }

  goToPrevPage() {
    // TO DO back if no of options per page was changed
    console.log(this.sliceEnd);
    console.log(this.sliceBegin);
    this.sliceEnd = this.sliceBegin;
    this.sliceBegin = this.sliceBegin - this.noElementsPerPage;
    console.log(this.sliceEnd);
    console.log(this.sliceBegin);
  }

}
