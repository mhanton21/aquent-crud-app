import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogClose} from "@angular/material/dialog";
import {Person} from "../person";
import {PersonService} from "../person.service";

@Component({
  selector: 'app-person-delete',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './person-delete.component.html',
  styleUrl: './person-delete.component.css'
})
export class PersonDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<PersonDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { person: Person},
    private personService: PersonService
  ) {}

  onConfirmDelete() {
    this.personService.deletePerson(this.data.person.personId);
    this.dialogRef.close('deleted');
  }

  onCancel() {
    this.dialogRef.close();
  }
}
