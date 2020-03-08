import { Component, OnInit, Input } from '@angular/core';
import { PlanetDto } from 'src/app/dto';

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.scss']
})
export class ListElementComponent implements OnInit {
  @Input() planet: PlanetDto;
  planetUrlID: string;
  constructor() { }

  ngOnInit(): void {
    this.planetUrlID = this.planet.url.substring(
      this.planet.url.lastIndexOf('planets/') + 8,
      this.planet.url.lastIndexOf('/')
    )
  }

}
