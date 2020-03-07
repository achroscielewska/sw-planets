import { Component, OnInit, Input } from '@angular/core';
import { Planet } from 'src/app/dto';

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.scss']
})
export class ListElementComponent implements OnInit {
  @Input() planet: Planet;
  constructor() {

  }

  ngOnInit(): void {
  }

}
