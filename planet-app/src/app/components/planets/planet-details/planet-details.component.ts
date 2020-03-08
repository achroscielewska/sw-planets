import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PlanetsService } from 'src/app/services/planets.service';
import { PlanetDto, PersonDto } from 'src/app/dto';

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

  planet: PlanetDto;
  terrainArray: string[];

  residentsList: PersonDto[];

  showResidentsList: boolean;
  showFilmsList: boolean;

  constructor(
    private route: ActivatedRoute,
    private planetsService: PlanetsService
  ) { }

  ngOnInit(): void {
    this.residentsList = [];
    this.showResidentsList = false;
    this.showFilmsList = false;
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => this.handelResponse(paramMap),
      (err) => console.error(err)
    );
  }

  ngOnDestroy(): void {
    this.planetSubscription.unsubscribe();
    this.residentSubscription.unsubscribe();
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
    console.log("see films")
    this.showFilmsList = true;
  }

  seeLessFilms() {
    this.showFilmsList = false;
  }
}


