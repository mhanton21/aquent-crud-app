package com.aquent.crudapp.client;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handling basic client management operations.
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    /**
     * Returns data for client listing.
     *
     * @return the current list of clients
     */
    @GetMapping(value = "")
    public List<Client> list() {
        return clientService.listClients();
    }

    /**
     * Validates and saves a new client.
     * On success, returns the new client.
     * On failure, returns the validation errors.
     *
     * @param client populated form bean for the client
     * @return new client, or validation errors
     */
    @PostMapping(value = "")
    public ResponseEntity<?> create(@RequestBody Client client) {
        List<String> errors = clientService.validateClient(client);
        if (errors.isEmpty()) {
            Integer clientId = clientService.createClient(client);
            Client createdClient = clientService.readClient(clientId);
            return ResponseEntity.ok(createdClient);
        }
		else {
            return ResponseEntity.badRequest().body(errors);
        }
    }
    
    /**
     * Validates and saves an edited client.
     * On success, returns the updated client.
     * On failure, returns the validation errors.
     *
     * @param client populated form bean for the client
     * @return updated client, or validation errors
     */
    @PutMapping(value = "")
    public ResponseEntity<?> edit(@RequestBody Client client) {
        List<String> errors = clientService.validateClient(client);
        if (errors.isEmpty()) {
            Integer clientId = client.getClientId();
            clientService.updateClient(client);
            Client updatedClient = clientService.readClient(clientId);
            return ResponseEntity.ok(updatedClient);
        } 
		else {
            return ResponseEntity.badRequest().body(errors);
        }
    }

    /**
     * Retrieves a client record.
     *
     * @param clientId the ID of the client to retrieve
     */
    @GetMapping(value="/{clientId}")
    public Client read(@PathVariable Integer clientId) {
        return clientService.readClient(clientId);
    }

    /**
     * Deletes a client record.
     *
     * @param clientId the ID of the client to delete
     */
    @DeleteMapping(value="/{clientId}")
    public void delete(@PathVariable Integer clientId) {
        clientService.deleteClient(clientId);
    }
}
