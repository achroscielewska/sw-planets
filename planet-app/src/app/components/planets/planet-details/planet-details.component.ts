import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PlanetsService } from 'src/app/services/planets.service';
import { PlanetDto } from 'src/app/dto';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit, OnDestroy {
  private planet$: Observable<any>;
  private planetSubscription: Subscription;

  planet: PlanetDto;

  constructor(
    private route: ActivatedRoute,
    private planetsService: PlanetsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => this.handelResponse(paramMap),
      (err) => console.error(err)
   );
  }

  ngOnDestroy(): void {
    this.planetSubscription.unsubscribe();
  }

 handelResponse(paramMap: ParamMap) {
  const id = paramMap.get('id');
  this.planet$ = this.planetsService.getPlanet(id);

  this.planetSubscription = this.planet$.subscribe((planet: PlanetDto) => {
    this.planet = planet;

    console.log(this.planet);
  });
 }

}
