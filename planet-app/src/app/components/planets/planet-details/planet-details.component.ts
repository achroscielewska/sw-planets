import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PlanetsService } from 'src/app/services/planets.service';
import { PlanetDto, PersonDto, FilmsDto } from 'src/app/dto';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit, OnDestroy {
  private planet$: Observable<PlanetDto>;
  private planetSubscription: Subscription;

  private resident$: Observable<PersonDto>;
  private residentSubscription: Subscription;

  private film$: Observable<FilmsDto>;
  private filmSubscription: Subscription;

  planet: PlanetDto;
  terrainArray: string[];

  residentsList: PersonDto[];
  filmsList: FilmsDto[];

  showResidentsList: boolean;
  showFilmsList: boolean;

  constructor(
    private route: ActivatedRoute,
    private planetsService: PlanetsService
  ) { }

  ngOnInit(): void {
    this.residentsList = [];
    this.filmsList = [];
    this.showResidentsList = false;
    this.showFilmsList = false;
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => this.handelResponse(paramMap),
      (err) => console.error(err)
    );
  }

  ngOnDestroy(): void {
    this.planetSubscription.unsubscribe();

    if (this.residentsList.length) {
      this.residentSubscription.unsubscribe();
    }

    if (this.filmsList.length) {
      this.filmSubscription.unsubscribe();
    }
  }

  handelResponse(paramMap: ParamMap) {
    const id = paramMap.get('id');
    this.planet$ = this.planetsService.getPlanet(id);

    this.planetSubscription = this.planet$.subscribe(
      (result: PlanetDto) => {
        this.planet = result;
        this.terrainArray = this.planet.terrain.split(',');
      },
      (err) => console.error(err)
    );
  }

  seeResidents() {
    this.showResidentsList = true;

    if (!this.residentsList.length) {
      this.planet.residents.forEach((url: string) => {
        const residentUrlID = url.substring(
          url.lastIndexOf('people/') + 7,
          url.lastIndexOf('/')
        );
        this.resident$ = this.planetsService.getPlanetResident(residentUrlID);
        this.residentSubscription = this.resident$.subscribe(
          (result: PersonDto) => { this.residentsList.push(result); },
          (err) => console.error(err)
        );
      });
    }
  }

  seeLessResidents() {
    this.showResidentsList = false;
  }

  seeFilms() {
    this.showFilmsList = true;

    if (!this.filmsList.length) {
      this.planet.films.forEach((url: string) => {
        const filmUrlID = url.substring(
          url.lastIndexOf('films/') + 6,
          url.lastIndexOf('/')
        );
        this.film$ = this.planetsService.getPlanetFilm(filmUrlID);
        this.filmSubscription = this.film$.subscribe(
          (result: FilmsDto) => { this.filmsList.push(result); },
          (err) => console.error(err)
        );
      });
    }
  }

  seeLessFilms() {
    this.showFilmsList = false;
  }
}


