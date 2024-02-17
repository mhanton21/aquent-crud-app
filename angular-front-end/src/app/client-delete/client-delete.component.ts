import {Component, Inject} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogClose
} from "@angular/material/dialog";
import {ClientService} from "../client.service";
import {Client} from "../client";

@Component({
  selector: 'app-client-delete',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogClose
  ],
  templateUrl: './client-delete.component.html',
  styleUrl: './client-delete.component.css'
})
export class ClientDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ClientDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client},
    private clientService: ClientService
  ) {}

  onConfirmDelete() {
    this.clientService.deleteClient(this.data.client.clientId);
    this.dialogRef.close('deleted');
  }

  onCancel() {
    this.dialogRef.close();
  }
}
