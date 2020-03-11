import { Component, Input } from '@angular/core';
import { PersonDto } from 'src/app/dto';

@Component({
  selector: 'app-residents-list-container',
  templateUrl: './residents-list-container.component.html',
  styleUrls: ['./residents-list-container.component.scss']
})
export class ResidentsListContainerComponent {
  @Input() residentsToDisplay: PersonDto[];

  constructor() { }
}
