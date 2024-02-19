import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../services/person.service";
import {Client} from "../../client";
import {ClientService} from "../../services/client.service";
import * as customValidators from "../../validators";
import {map} from "rxjs";

@Component({
  selector: 'app-person-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css'
})
export class PersonEditComponent implements OnInit {

  isEditMode: boolean = false;
  isInvalidPage: boolean = false;
  personForm: FormGroup = new FormGroup<any>({});
  person: any;
  clients: Client[] = [];
  errors: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private personService: PersonService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.initFormGroup();
    this.initPerson();
    this.listClients();
  }

  initFormGroup() {
    this.personForm = this.fb.group({
      personId: [''],
      firstName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      emailAddress: ['', [Validators.required, Validators.email, Validators.minLength(1), Validators.maxLength(50)]],
      streetAddress: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      state: ['', [Validators.required, customValidators.stateValidator]],
      zipCode: ['', [Validators.required, customValidators.zipCodeValidator]],
      clientId: ['']
    });
  }

  patchFormGroupValues() {
    this.personForm.patchValue({
      personId: this.person.personId,
      firstName: this.person.firstName,
      lastName: this.person.lastName,
      emailAddress: this.person.emailAddress,
      streetAddress: this.person.streetAddress,
      city: this.person.city,
      state: this.person.state,
      zipCode: this.person.zipCode,
      clientId: this.person.clientId || ""
    });
  }

  initPerson() {
    if (window.history.state.person) {
      this.activatedRoute.paramMap.pipe(map(() => window.history.state))
        .subscribe(result => {
          this.person = result.person;
          this.patchFormGroupValues();
        });
      this.isEditMode = true;
    }
    else {
      const personId = this.activatedRoute.snapshot.paramMap.get('id');
      this.isEditMode = !!personId && personId != 'new';
      if (this.isEditMode) {
        this.readPerson(Number(personId));
      }
    }
  }

  async readPerson(personId: number) {
    try {
      this.person = await this.personService.readPerson(personId);
      this.patchFormGroupValues();
    }
    catch (error) {
      console.error(error);
      this.isInvalidPage = true;
    }
  }

  async listClients() {
    try {
      this.clients = await this.clientService.listClients();
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

  getPageTitle() {
    if (this.isInvalidPage) {
      return "Person Not Found";
    }
    else if (this.isEditMode) {
      return "Edit Person";
    }
    else {
      return "Create Person";
    }
  }

  getClasses(formControlName: string) {
    return { 'is-invalid': this.personForm.get(formControlName)?.invalid };
  }

  getErrorMessage(formControlName: string) {
    const errors = this.personForm.get(formControlName)?.errors
    if (errors == null) {
      return '';
    }
    return customValidators.getErrorMessage(errors);
  }
}
