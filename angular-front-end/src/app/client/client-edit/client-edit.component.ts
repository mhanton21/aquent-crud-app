import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {Person} from "../../person";
import {PersonService} from "../../services/person.service";
import * as customValidators from "../../validators";
import {map} from "rxjs";

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent implements OnInit {

  isEditMode: boolean = false;
  isInvalidPage: boolean = false;
  clientForm: FormGroup = new FormGroup<any>({});
  client: any;
  persons: Person[] = [];
  errors: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private clientService: ClientService,
    private personService: PersonService
  ) {}

  ngOnInit() {
    this.initFormGroup();
    this.initClient();
  }

  initFormGroup() {
    this.clientForm = this.fb.group({
      clientId: [''],
      companyName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      websiteUri: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, customValidators.phoneNumberValidator]],
      streetAddress: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      state: ['', [Validators.required, customValidators.stateValidator]],
      zipCode: ['', [Validators.required, customValidators.zipCodeValidator]],
      contactIds: [[]]
    });
  }

  patchFormGroupValues() {
    this.clientForm.patchValue({
      clientId: this.client.clientId,
      companyName: this.client.companyName,
      websiteUri: this.client.websiteUri,
      phoneNumber: this.client.phoneNumber,
      streetAddress: this.client.streetAddress,
      city: this.client.city,
      state: this.client.state,
      zipCode: this.client.zipCode,
      contactIds: this.client.contactIds || []
    });
  }

  initClient() {
    if (window.history.state.client) {
      this.activatedRoute.paramMap.pipe(map(() => window.history.state))
        .subscribe(result => {
          this.client = result.client;
          this.patchFormGroupValues();
          this.isEditMode = true;
          this.listPeople({"clientId": Number(this.client.clientId)});
        })
    }
    else {
      const clientId = this.activatedRoute.snapshot.paramMap.get('id');
      this.isEditMode = !!clientId && clientId != 'new';
      if (this.isEditMode) {
        this.readClient(Number(clientId));
        this.listPeople({"clientId": Number(clientId)});
      }
      else {
        this.listPeople({"newClient": true});
      }
    }
  }

  async readClient(clientId: number) {
    try {
      this.client = await this.clientService.readClient(clientId);
      this.patchFormGroupValues();
    }
    catch (error) {
      console.error(error);
      this.isInvalidPage = true;
    }
  }

  async listPeople(filterCriteria?: { [key: string]: any }) {
    try {
      this.persons = await this.personService.listPeople();
      if (filterCriteria && filterCriteria['newClient']) {
        this.persons = this.persons.filter(person => person.clientId === null);
      }
      else if (filterCriteria && filterCriteria['clientId']) {
        const clientId = filterCriteria['clientId'];
        this.persons = this.persons.filter(person => person.clientId === null ||
          person.clientId === clientId);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  onSubmit() {
    if (this.clientForm.invalid) return;

    const clientData = this.clientForm.value;
    if (this.isEditMode) {
      this.clientService.editClient(clientData)
        .catch(error => {
          this.errors = error;
        });
    }
    else {
      delete clientData.clientId;
      this.clientService.createClient(clientData)
        .catch(error => {
          this.errors = error;
        });
    }
  }

  getPageTitle() {
    if (this.isInvalidPage) {
      return "Client Not Found";
    }
    else if (this.isEditMode) {
      return "Edit Client";
    }
    else {
      return "Create Client";
    }
  }

  getClasses(formControlName: string) {
    return { 'is-invalid': this.clientForm.get(formControlName)?.invalid };
  }

  getErrorMessage(formControlName: string) {
    const errors = this.clientForm.get(formControlName)?.errors
    if (errors == null) {
      return '';
    }
    return customValidators.getErrorMessage(errors);
  }
}
