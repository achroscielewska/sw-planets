import { Component, Input } from '@angular/core';
import { PlanetDto } from 'src/app/dto';

@Component({
  selector: 'app-planets-list-container',
  templateUrl: './planets-list-container.component.html',
  styleUrls: ['./planets-list-container.component.scss']
})
export class PlanetsListContainerComponent {
  @Input() planetsToDisplay: PlanetDto[];
  @Input() sliceBegin: number;
  @Input() sliceEnd: number;

  constructor() { }
}
