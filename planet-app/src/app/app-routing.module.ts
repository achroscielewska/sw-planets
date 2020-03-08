import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  NoContentComponent,
  PlanetsListComponent,
  PlanetDetailsComponent
} from './components';

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
