import { Component, Input } from '@angular/core';
import { PlanetDto } from 'src/app/dto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() planetsToDisplay: PlanetDto[];
  @Input() sliceBegin: number;
  @Input() sliceEnd: number;

  constructor() { }
}
