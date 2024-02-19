import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {PersonService} from "./services/person.service";
import {ClientService} from "./services/client.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Aquent CRUD App';

  constructor(
    private personService: PersonService,
    private clientService: ClientService
  ){}

  navigateToListPeople() {
    this.personService.navigateToListPeople();
  }

  navigateToListClients() {
    this.clientService.navigateToListClients();
  }
}
