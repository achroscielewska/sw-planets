import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment  as env } from '../../environments/environment';
import { PlanetsDto } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(private httpClient: HttpClient) { }

  getPlanetsList$(pageNo: number) {
    return this.httpClient.get<PlanetsDto>(`${env.planetsUrl.getList}/?page=${pageNo}`);
  }
}
