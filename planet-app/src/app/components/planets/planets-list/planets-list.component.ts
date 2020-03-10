import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanetsDto, PlanetDto } from 'src/app/dto';
import { PlanetsService } from 'src/app/services/planets.service';
import { Subject, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit, OnDestroy {
  private planets$: Observable<PlanetsDto>;
  private planetsSubscription: Subscription;

  currentPageNo: number;
  nextPageToFetch: number;
  planetsToDisplay: PlanetDto[] = [];

  maxAPINumberOfListEl: number;
  maxAPINumberOfElPerPage: number;
  numberOfFetchedEl: number;
  sliceBegin: number;
  sliceEnd: number;

  noElementsPerPage = 10;
  arrElementsPerPage = [5, 10, 25, 100];


  maxNumberOfPages: number;
  pageNumberQueryChanged = new Subject<number>();
  searchPlanetsByName = new Subject<string>();
  searchInputByName: string;

  searchMode: boolean;

  constructor(private planetsService: PlanetsService) {
    this.pageNumberQueryChanged
      .pipe(debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe(
        (model: number) => { this.setUpPageNoAfterChange(model); },
        (err) => console.error(err)
      );

    this.searchPlanetsByName
      .pipe(debounceTime(800),
        distinctUntilChanged()
      )
      .subscribe(
        (model: string) => { this.initPlanetListWithSearch(model); },
        (err) => console.error(err)
      );
  }

  ngOnInit() {
    this.initPlanetList();
  }

  ngOnDestroy(): void {
    this.planetsSubscription.unsubscribe();
  }

  private initPlanetListWithSearch(name: string) {
    this.setUpInitParameters(1, 1, [], 0, 0);

    this.searchInputByName = name;

    this.planets$ = this.planetsService.searchPlanets(this.currentPageNo, name);
    this.planetsSubscription = this.planets$.subscribe(
      (result: PlanetsDto) => {
        this.planetsToDisplay.push(...result.results);

        if (this.planetsToDisplay) {
          this.searchMode = true;
          this.setUpInitListParameters(result);
        } else {
          this.searchMode = false;
        }
      },
      (err) => console.error(err)
    );
  }

  private initPlanetList() {
    this.setUpInitParameters(0, 1, [], 0, 0);

    this.planets$ = this.planetsService.getPlanetsList(this.nextPageToFetch);
    this.planetsSubscription = this.planets$.subscribe(
      (result: PlanetsDto) => {
        this.planetsToDisplay.push(...result.results);
        this.setUpInitListParameters(result);
      },
      (err) => console.error(err)
    );
  }

  private setUpInitParameters(currentPageNo: number, nextPageToFetch: number, planetsToDisplay: [], sliceBegin: number, sliceEnd: number) {
    this.currentPageNo = currentPageNo;
    this.nextPageToFetch = nextPageToFetch;
    this.planetsToDisplay = planetsToDisplay;
    this.sliceBegin = sliceBegin;
    this.sliceEnd = sliceEnd;
  }

  private setUpInitListParameters(result: PlanetsDto) {
    this.maxAPINumberOfListEl = result.count;
    this.maxAPINumberOfElPerPage = result.results.length;

    this.setUpSliceList();
    this.setUpPageCounter();
    this.setUpListElementsView();
  }

  private setUpSliceList() {
    this.sliceBegin = this.sliceEnd;
    this.sliceEnd = this.sliceBegin + this.noElementsPerPage;
  }

  private setUpPageCounter() {
    this.maxNumberOfPages = Math.ceil(this.maxAPINumberOfListEl / this.noElementsPerPage);
    this.currentPageNo = Math.ceil(this.sliceBegin / this.noElementsPerPage) + 1;
  }

  private setUpListElementsView() {
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
    if (this.searchMode) {
      this.planetsService.searchPlanets(this.nextPageToFetch, this.searchInputByName)
        .subscribe(
          (result: PlanetsDto) => {
            this.planetsToDisplay.push(...result.results);
            this.setUpListElementsView();
          },
          (err) => console.error(err)
        );
    } else {
      this.planetsService.getPlanetsList(this.nextPageToFetch)
        .subscribe(
          (result: PlanetsDto) => {
            this.planetsToDisplay.push(...result.results);
            this.setUpListElementsView();
          },
          (err) => console.error(err)
        );
    }
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

  onChangeSearchValue(newValue: string) {
    this.searchPlanetsByName.next(newValue);
  }
}
