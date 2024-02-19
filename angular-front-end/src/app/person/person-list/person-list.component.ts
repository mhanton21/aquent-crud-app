import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Person} from "../../person";
import {PersonService} from "../../services/person.service";
import {PersonDeleteComponent} from "../person-delete/person-delete.component";
import {ClientService} from "../../services/client.service";
import {PaginationService} from "../../services/pagination.service";

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css',
  providers: [PaginationService]
})
export class PersonListComponent implements OnInit {

  persons: Person[] = [];
  clients: Map<number, string> = new Map();

  constructor(
    private modalService: NgbModal,
    private personService: PersonService,
    private clientService: ClientService,
    private pageService: PaginationService
  ) {}

  ngOnInit() {
    this.listPeople();
    this.listClients();
  }

  async listPeople() {
    try {
      this.persons = await this.personService.listPeople();
      this.setPagination();
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
    const dialogRef = this.modalService.open(PersonDeleteComponent);
    dialogRef.componentInstance.data = {person};
    dialogRef.result.then((result) => {
      if (result === 'deleted') {
        this.listPeople();
      }
    });
  }

  editPerson(person?: Person) {
    this.personService.navigateToEditPerson(person);
  }

  setPagination() {
    this.pageService.updateData(this.persons);
  }

  getPageData() {
    return this.pageService.getPageData();
  }
}
