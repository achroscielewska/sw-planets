import { Component, Input } from '@angular/core';
import { FilmsDto } from 'src/app/dto';

@Component({
  selector: 'app-films-list-container',
  templateUrl: './films-list-container.component.html',
  styleUrls: ['./films-list-container.component.scss']
})
export class FilmsListContainerComponent {
  @Input() filmsToDisplay: FilmsDto[];

  constructor() { }
}
