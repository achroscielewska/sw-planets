import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { PlanetsDto } from '../dto';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  pageQueryUrl = '?page=';

  constructor(private httpClient: HttpClient) { }

  getPlanetsList(pageNumber: number) {
    return this.httpClient
      .get(`${env.planetsUrl.getList}${this.pageQueryUrl}${pageNumber}`)
      .pipe(map(res => res));
  }
}
