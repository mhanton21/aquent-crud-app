import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import axios from 'axios';
import {Person} from "./person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private personEndpoint = "http://localhost:8081/person";

  constructor(
    private router: Router
  ) { }

  async listPeople(): Promise<Person[]> {
    try {
      const response = await axios.get<Person[]>(this.personEndpoint);
      return response.data;
    }
    catch (error) {
      console.error("Error listing people: ",error);
      throw error;
    }
  }

  async readPerson(personId: number) {
    try {
      const url = this.personEndpoint + "/" + personId;
      const response = await axios.get<Person>(url);
      return response.data;
    }
    catch (error) {
      console.error('Error reading person: ',error);
      throw error;
    }
  }

  deletePerson(personId: number) {
    const url = this.personEndpoint + "/" + personId;
    axios.delete(url)
      .then(response => {
        if (response.status == 200) {
          console.log('Person deleted: ', response.data);
        }
        else {
          console.error('Unexpected status: ', response.status);
        }
      })
      .catch(error => {
        console.error('Error deleting person: ', error);
      });
  }

  editPerson(person: any): Promise<any> {
    return axios.put(this.personEndpoint,person)
      .then(response => {
        console.log('Person edited: ',response.data);
        this.navigateToListPeople();
      })
      .catch(error => {
        console.error('Error editing person: ',error);
        if (error.response) {
          return Promise.reject(error.response.data);
        }
        else {
          return Promise.reject(error);
        }
      });
  }

  createPerson(person: any): Promise<any> {
    return axios.post(this.personEndpoint, person)
      .then(response => {
        console.log('Person created: ',response.data);
        this.navigateToListPeople();
      })
      .catch(error => {
        console.error('Error creating person: ',error);
        if (error.response) {
          return Promise.reject(error.response.data);
        }
        else {
          return Promise.reject(error);
        }
      });
  }

  navigateToEditPerson(personId?: number) {
    const path = personId ? ['/person',personId] : ['/person/new'];
    this.router.navigate(path);
  }

  navigateToListPeople() {
    this.router.navigate(['/person']);
  }
}
