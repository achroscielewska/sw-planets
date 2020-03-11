import { Component } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-loader',
  template: '<div *ngIf="isVisible()" class="App-loader"></div>',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  private static visible = false;

  public static show: () => void = () => LoaderComponent.visible = true;
  public static hide: () => void = () => LoaderComponent.visible = false;

  private static createTimer(): Observable<number> {
    return timer(5000);
  }

  public isVisible() {return LoaderComponent.visible; }


}


