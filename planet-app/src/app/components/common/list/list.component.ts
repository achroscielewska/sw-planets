import { Component, OnInit, Input } from '@angular/core';
import { Planet } from 'src/app/dto';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() planetsToDisplay: Planet[];
  @Input() sliceBegin: number;
  @Input() sliceEnd: number;

  constructor() { }

  ngOnInit(): void {
  }

}
