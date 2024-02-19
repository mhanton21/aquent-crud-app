import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Client} from "../../client";
import {ClientService} from "../../services/client.service";
import {ClientDeleteComponent} from "../client-delete/client-delete.component";
import {PersonService} from "../../services/person.service";
import {PaginationService} from "../../services/pagination.service";

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
  providers: [PaginationService]
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];
  persons: Map<number, string> = new Map();

  constructor(
    private modalService: NgbModal,
    private clientService: ClientService,
    private personService: PersonService,
    private pageService: PaginationService
  ) {}

  ngOnInit() {
    this.listClients();
    this.listPeople();
  }

  async listClients() {
    try {
      this.clients = await this.clientService.listClients();
      this.setPagination();
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
    const dialogRef = this.modalService.open(ClientDeleteComponent);
    dialogRef.componentInstance.data = {client};
    dialogRef.result.then((result) => {
      if (result === 'deleted') {
        this.listClients();
      }
    });
  }

  editClient(client?: Client) {
    this.clientService.navigateToEditClient(client);
  }

  setPagination() {
    this.pageService.updateData(this.clients);
  }

  getPageData() {
    return this.pageService.getPageData();
  }
}
