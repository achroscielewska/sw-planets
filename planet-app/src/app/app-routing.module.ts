import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './components/index';
import {
  PlanetsListComponent,
  PlanetDetailsComponent
} from './components/planets/index';

const routes: Routes = [
  {path: '', component: PlanetsListComponent},
  {
    path: '',
    children: [
      {
        path: ':url',
        component: PlanetDetailsComponent,
      },
    ]},
  {path: '**', component: NoContentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
