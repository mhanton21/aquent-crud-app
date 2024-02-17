import { Routes } from '@angular/router';
import {PersonListComponent} from "./person-list/person-list.component";
import {PersonEditComponent} from "./person-edit/person-edit.component";
import {ClientListComponent} from "./client-list/client-list.component";
import {ClientEditComponent} from "./client-edit/client-edit.component";

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
  }
];
