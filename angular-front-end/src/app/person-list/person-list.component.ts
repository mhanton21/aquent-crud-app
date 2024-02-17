import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatTableModule, MatTable, MatHeaderCell, MatCell, MatHeaderRow, MatRow} from '@angular/material/table'
import {MatDialog} from "@angular/material/dialog";
import {Person} from "../person";
import {PersonService} from "../person.service";
import {PersonDeleteComponent} from "../person-delete/person-delete.component";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTable, MatHeaderCell, MatCell, MatHeaderRow, MatRow],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];
  clients: Map<number, string> = new Map();
  columnsToDisplay: string[] = ['firstName', 'lastName', 'emailAddress', 'client', 'actions'];

  constructor(
    private dialog: MatDialog,
    private personService: PersonService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.listPeople();
    this.listClients();
  }

  async listPeople() {
    try {
      this.persons = await this.personService.listPeople();
    }
    catch (error) {
      console.error(error);
    }
  }

  async listClients() {
    try {
      const clientList = await this.clientService.listClients();
      this.clients = new Map(clientList.map(client => [client.clientId, client.companyName]));
    }
    catch (error) {
      console.error(error);
    }
  }

  deletePerson(person: Person) {
    const dialogRef = this.dialog.open(PersonDeleteComponent, {
      data: {person}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        this.listPeople();
      }
    });
  }

  editPerson(personId?: number) {
    this.personService.navigateToEditPerson(personId);
  }
}
