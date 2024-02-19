import { Routes } from '@angular/router';
import {PersonListComponent} from "./person/person-list/person-list.component";
import {PersonEditComponent} from "./person/person-edit/person-edit.component";
import {ClientListComponent} from "./client/client-list/client-list.component";
import {ClientEditComponent} from "./client/client-edit/client-edit.component";

export const routes: Routes = [
  {
    path: 'person',
    component: PersonListComponent
  },
  {
    path: 'person/:id',
    component: PersonEditComponent
  },
  {
    path: 'client',
    component: ClientListComponent
  },
  {
    path: 'client/:id',
    component: ClientEditComponent
  },
  {
    path: '**',
    component: PersonListComponent
  }
];
