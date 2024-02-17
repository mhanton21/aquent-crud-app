import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../person.service";

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css'
})
export class PersonEditComponent implements OnInit {

  isEditMode: boolean = false;
  title: string = "";
  personForm: FormGroup = new FormGroup<any>({});
  person: any;
  errors: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private personService: PersonService
  ) {}

  ngOnInit() {
    const personId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!personId && personId != 'new';
    this.title = this.isEditMode ? "Edit Person" : "Create Person";

    this.personForm = this.fb.group({
      personId: [''],
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      emailAddress: ['', [Validators.required, Validators.email, Validators.minLength(1), Validators.maxLength(50)]],
      streetAddress: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    });

    if (this.isEditMode) {
      this.readPerson(Number(personId));
    }
  }

  async readPerson(personId: number) {
    try {
      this.person = await this.personService.readPerson(personId);
      this.personForm.patchValue({
        personId: this.person.personId,
        firstName: this.person.firstName,
        lastName: this.person.lastName,
        emailAddress: this.person.emailAddress,
        streetAddress: this.person.streetAddress,
        city: this.person.city,
        state: this.person.state,
        zipCode: this.person.zipCode
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  onSubmit() {
    if (this.personForm.invalid) return;

    const personData = this.personForm.value;
    if (this.isEditMode) {
      this.personService.editPerson(personData)
        .catch(error => {
          this.errors = error;
        });
    }
    else {
      delete personData.personId;
      this.personService.createPerson(personData)
        .catch(error => {
          this.errors = error;
        });
    }
  }
}
