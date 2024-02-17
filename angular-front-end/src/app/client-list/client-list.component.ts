import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";
import {Client} from "../client";
import {ClientService} from "../client.service";
import {ClientDeleteComponent} from "../client-delete/client-delete.component";
import {MatDialog} from "@angular/material/dialog";
import {PersonService} from "../person.service";

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableModule
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];
  persons: Map<number, string> = new Map();
  columnsToDisplay: string[] = ['companyName', 'websiteUri', 'phoneNumber', 'contacts', 'actions'];

  constructor(
    private dialog: MatDialog,
    private clientService: ClientService,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.listClients();
    this.listPeople();
  }

  async listClients() {
    try {
      this.clients = await this.clientService.listClients();
    }
    catch (error) {
      console.error(error);
    }
  }

  async listPeople() {
    try {
      const personList = await this.personService.listPeople();
      this.persons = new Map(personList.map(person =>
        [person.personId, `${person.firstName} ${person.lastName}`]));
    }
    catch (error) {
      console.error(error);
    }
  }

  deleteClient(client: Client) {
    const dialogRef = this.dialog.open(ClientDeleteComponent, {
      data: {client}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'deleted') {
        this.listClients();
      }
    });
  }

  editClient(clientId?: number) {
    this.clientService.navigateToEditClient(clientId);
  }
}
