import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PersonService} from "../../services/person.service";

@Component({
  selector: 'app-person-delete',
  standalone: true,
  imports: [],
  templateUrl: './person-delete.component.html',
  styleUrl: './person-delete.component.css'
})
export class PersonDeleteComponent {

  @Input() data: any;

  constructor(
    public activeModal: NgbActiveModal,
    private personService: PersonService
  ) {}

  async onConfirmDelete() {
    try {
      await this.personService.deletePerson(this.data.person.personId);
    }
    catch(error) {
      console.error(error);
    }
    this.activeModal.close('deleted');
  }

  onCancel() {
    this.activeModal.close();
  }
}
