import { Routes } from '@angular/router';
import {PersonListComponent} from "./person-list/person-list.component";
import {PersonEditComponent} from "./person-edit/person-edit.component";

export const routes: Routes = [
  {
    path: 'person/list',
    component: PersonListComponent
  },
  {
    path: 'person/:id',
    component: PersonEditComponent
  }
];
