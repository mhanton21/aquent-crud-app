import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-client-delete',
  standalone: true,
  imports: [],
  templateUrl: './client-delete.component.html',
  styleUrl: './client-delete.component.css'
})
export class ClientDeleteComponent {

  @Input() data: any;

  constructor(
    public activeModal: NgbActiveModal,
    private clientService: ClientService
  ) {}

  async onConfirmDelete() {
    try {
      await this.clientService.deleteClient(this.data.client.clientId);
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
