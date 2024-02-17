import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatTableModule, MatTable, MatHeaderCell, MatCell, MatHeaderRow, MatRow} from '@angular/material/table'
import {Person} from "../person";
import {PersonService} from "../person.service";
import {PersonDeleteComponent} from "../person-delete/person-delete.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTable, MatHeaderCell, MatCell, MatHeaderRow, MatRow],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];
  columnsToDisplay: string[] = ['firstName', 'lastName', 'emailAddress', 'actions'];

  constructor(
    private dialog: MatDialog,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.listPeople();
  }

  async listPeople() {
    try {
      this.persons = await this.personService.listPeople();
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
