import { Component, OnInit } from '@angular/core';

import { PlanetsDto, PlanetDto } from 'src/app/dto';
import { PlanetsService } from 'src/app/services/planets.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';


@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {
  planetsToDisplay: PlanetDto[] = [];

  maxAPINumberOfListEl: number;
  maxAPINumberOfElPerPage: number;
  numberOfFetchedEl: number;
  nextPageToFetch = 1;

  noElementsPerPage = 10;
  arrElementsPerPage = [5, 10, 25, 100];
  sliceBegin = 0;
  sliceEnd = 0;

  maxNumberOfPages: number;
  currentPageNo: number;
  pageNumberQueryChanged = new Subject<number>();

  searchInput: string;

  constructor(private planetsService: PlanetsService) {
    this.pageNumberQueryChanged
      .pipe(debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe(model => {
        this.setUpPageNoAfterChange(model);
      });
  }

  ngOnInit() {
    this.initPlanetList();
  }

  private initPlanetList() {
    this.planetsService.getPlanetsList(this.nextPageToFetch)
      .subscribe(
        (result: PlanetsDto) => {
          this.maxAPINumberOfListEl = result.count;
          this.maxAPINumberOfElPerPage = result.results.length;

          this.setUpSliceList();
          this.setUpPageCounter();
          this.setUpListElementsView(result.results);
        },
        (err) => console.error(err)
      );
  }

  private setUpSliceList() {
    this.sliceBegin = this.sliceEnd;
    this.sliceEnd = this.sliceBegin + this.noElementsPerPage;
  }

  private setUpPageCounter() {
    this.maxNumberOfPages = Math.ceil(this.maxAPINumberOfListEl / this.noElementsPerPage)
    this.currentPageNo = Math.ceil(this.sliceBegin / this.noElementsPerPage) + 1
  }

  private setUpListElementsView(results: PlanetDto[]) {
    this.planetsToDisplay.push(...results);
    this.numberOfFetchedEl = this.planetsToDisplay.length;
    this.nextPageToFetch++;

    this.checkIfCanFetchMoreElements();
  }

  private checkIfCanFetchMoreElements() {
    if (this.sliceEnd > this.numberOfFetchedEl && this.maxAPINumberOfListEl > this.numberOfFetchedEl) {
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

  onChangeNoElements(newValue) {
    if (this.noElementsPerPage < newValue) {
      this.sliceBegin = 0;
    }
    this.noElementsPerPage = +newValue;
    this.sliceEnd = this.sliceBegin + this.noElementsPerPage;
    this.checkIfCanFetchMoreElements();
    this.setUpPageCounter();
  }

  goToNextPage() {
    this.setUpSliceList();
    this.setUpPageCounter();
    this.checkIfCanFetchMoreElements();
  }

  goToPrevPage() {
    this.sliceEnd = this.sliceBegin;
    this.sliceBegin = this.sliceBegin - this.noElementsPerPage;
    this.setUpPageCounter();
  }

  onChangePageNumber(newValue: number) {
    this.pageNumberQueryChanged.next(newValue);
  }

  private setUpPageNoAfterChange(newValue: number) {
    if (newValue < 1) {
      this.currentPageNo = 1;
      this.sliceBegin = 0;
      this.sliceEnd = this.sliceBegin + this.noElementsPerPage;
    }

    if (newValue > this.maxNumberOfPages) {
      this.currentPageNo = this.maxNumberOfPages;
      this.sliceBegin = this.noElementsPerPage * this.maxNumberOfPages - this.noElementsPerPage;
      this.sliceEnd = this.maxAPINumberOfListEl;

      this.checkIfCanFetchMoreElements();
    } else {
      this.currentPageNo = newValue;
      this.sliceBegin = this.noElementsPerPage * newValue - this.noElementsPerPage;
      this.sliceEnd = this.sliceBegin + this.noElementsPerPage;

      this.checkIfCanFetchMoreElements();
    }
  }

}
