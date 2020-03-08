import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlanetsDto, PlanetDto, PersonDto, FilmsDto } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  pageQueryUrl = '?page=';
  searchQueryUrl = '?search=';

  constructor(private httpClient: HttpClient) { }

  getPlanetsList(pageNumber: number): Observable<PlanetsDto> {
    return this.httpClient
      .get(`${env.planetsUrl.getList}${this.pageQueryUrl}${pageNumber}`)
      .pipe(map((res: PlanetsDto) => res));
  }

  getPlanet(id: string): Observable<PlanetDto> {
    return this.httpClient
      .get(`${env.planetsUrl.getList}/${id}`)
      .pipe(map((res: PlanetDto) => res));
  }

  getPlanetResident(id: string): Observable<any> {
    return this.httpClient
    .get(`${env.peopleUrl.getList}/${id}`)
    .pipe(map((res: PersonDto) => res));
  }

  getPlanetFilm(id: string): Observable<any> {
    return this.httpClient
    .get(`${env.filmsUrl.getList}/${id}`)
    .pipe(map((res: FilmsDto) => res));
  }
}
