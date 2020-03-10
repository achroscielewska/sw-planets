import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoContentComponent } from './components/index';
import {
  PlanetsListComponent,
  PlanetDetailsComponent
} from './components/planets/index';

const routes: Routes = [
  { path: 'planets', component: PlanetsListComponent },
  {
    path: 'planets',
    children: [
      {
        path: ':id',
        component: PlanetDetailsComponent,
      },
    ]
  },
  {
    path: '',
    redirectTo: '/planets',
    pathMatch: 'full'
  },
  { path: '**', component: NoContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
