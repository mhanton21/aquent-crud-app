import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import axios from 'axios';
import {Client} from "./client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientEndpoint = "http://localhost:8081/client";

  constructor(
    private router: Router
  ) { }

  async listClients(): Promise<Client[]> {
    try {
      const response = await axios.get<Client[]>(this.clientEndpoint);
      return response.data;
    }
    catch (error) {
      console.error("Error listing clients: ",error);
      throw error;
    }
  }

  async readClient(clientId: number) {
    try {
      const url = this.clientEndpoint + "/" + clientId;
      const response = await axios.get<Client>(url);
      return response.data;
    }
    catch (error) {
      console.error('Error reading client: ',error);
      throw error;
    }
  }

  deleteClient(clientId: number) {
    const url = this.clientEndpoint + "/" + clientId;
    axios.delete(url)
      .then(response => {
        if (response.status == 200) {
          console.log('Client deleted: ', response.data);
        }
        else {
          console.error('Unexpected status: ', response.status);
        }
      })
      .catch(error => {
        console.error('Error deleting client: ', error);
      });
  }

  editClient(client: any): Promise<any> {
    return axios.put(this.clientEndpoint,client)
      .then(response => {
        console.log('Client edited: ',response.data);
        this.navigateToListClients();
      })
      .catch(error => {
        console.error('Error editing client: ',error);
        if (error.response) {
          return Promise.reject(error.response.data);
        }
        else {
          return Promise.reject(error);
        }
      });
  }

  createClient(client: any): Promise<any> {
    return axios.post(this.clientEndpoint, client)
      .then(response => {
        console.log('Client created: ',response.data);
        this.navigateToListClients();
      })
      .catch(error => {
        console.error('Error creating client: ',error);
        if (error.response) {
          return Promise.reject(error.response.data);
        }
        else {
          return Promise.reject(error);
        }
      });
  }

  navigateToEditClient(clientId?: number) {
    const path = clientId ? ['/client',clientId] : ['/client/new'];
    this.router.navigate(path);
  }

  navigateToListClients() {
    this.router.navigate(['/client']);
  }
}
