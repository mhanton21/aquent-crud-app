import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../client.service";
import {Person} from "../person";
import {PersonService} from "../person.service";

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.css'
})
export class ClientEditComponent implements OnInit {

  isEditMode: boolean = false;
  title: string = "";
  clientForm: FormGroup = new FormGroup<any>({});
  client: any;
  persons: Person[] = [];
  errors: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private clientService: ClientService,
    private personService: PersonService
  ) {}

  ngOnInit() {
    const clientId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!clientId && clientId != 'new';
    this.title = this.isEditMode ? "Edit Client" : "Create Client";

    this.clientForm = this.fb.group({
      clientId: [''],
      companyName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      websiteUri: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      streetAddress: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      contactIds: [[]]
    });

    if (this.isEditMode) {
      this.readClient(Number(clientId));
      this.listPeople({"clientId": Number(clientId)});
    } else {
      this.listPeople({"newClient": true});
    }
  }

  async readClient(clientId: number) {
    try {
      this.client = await this.clientService.readClient(clientId);
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
    catch (error) {
      console.error(error);
    }
  }

  async listPeople(queryParams?: { [key: string]: any }) {
    try {
      this.persons = await this.personService.listPeople(queryParams);
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
}
