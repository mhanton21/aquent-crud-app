# Notes on completed work

The specification for Client was similar to Person, so I started with refactoring the existing project to reduce work later.
* Moved SQL queries into a separate properties file. Isolating the SQL logic makes future enhancement/replacement easier.
* Converted from Thymeleaf to Angular. I recently started learning Angular by building a simple CRUD app, so a lot of that experience was applicable here.
  * Delete Person didn't need to be a separate page. A dialog box suffices.
  * Combined Edit and Create into 1 component to reduce duplication. We just need a flag to indicate which "mode" we're in.
  * Used FormControl validators to implement front-end equivalent to back-end validation. Added a few custom validators, e.g. a valid zip code is 5 digits not just 5 characters. Error messages display below the relevant fields.
  * Created services to handle all requests to back end
* Converted API endpoints to meet REST conventions

Implementing Client mostly involved copying and adjusting the Person source code files.

Implementing Client-Person relationship
* Person has "associated client" and Client has "associated contacts". So client can have any number of contacts (including 0) and person can only have 1.
* Two options to define the relationship in the database
  * Add a client column to the person table, foreign key to client.client_id
  * Add a new table called contact, which map between person_id and client_id, foreign keys to person.person_id and client.client_id
  * Mapping table has the most flexibility, so went forward with that.
    * If a Person or Client is deleted, cascading deletes takes care of deleting the relationship.
    * If Person can eventually have multiple clients, no database changes needed.
* On Person List, added column to display client
* On Person Edit/Create, added dropdown field to select client.
* On Client List, added column to display contacts
* On Client Edit/Create, added multi-select field for contacts
  * Since a person can only be the contact for 1 client, needed to filter the options. 
  * GET /person retrieves the person list, so could include optional query parameters that change which SQL query runs on the back end.
    * ?clientId=<id> returns persons either associated with the client or not associated with any client
    * ?newClient=true returns persons that are not associated with any client
  * Issue with above approach: it puts implementation of front end into back end, and we want to keep them decoupled
    * Better option: Retrieve the person list and do the filtering on the front end

Since we retrieve all persons/clients for the List page, it would be convenient to just pass the object when we click the Edit button and skip the request to the back end. Router allows passing the client/person object. If the object isn't present (user accessed the page directly), the original logic still works to fetch the data.

For styling, introduced Bootstrap.
* Useful for ensuring page responsiveness (reduce issues after window resize)
* Removed the need for mat-table, since Bootstrap allowed the equivalent (and better) styling.
* I wanted to add pagination for easier navigation of large lists. 
  * Tried out mat-pagination, but did not perform as desired (e.g. 'animation' for page size options was buggy). Bootstrap styling on document elements I constructed myself ended up working better.
  * Moved pagination into a (non-singleton) service to eliminate the duplicate logic.
* Replaced mat-dialog with Bootstrap modal.
* Styling for client-side validation failures.

Invalid URL Paths
* Added wildcard path so any requests for URLs other than the expected endpoints just redirect to Person Listing
* Attempting to access the Edit/New Client/Person page with an invalid id will display a 'not found' message.

# Future ideas

* Table sorting
* Search bar to filter list page
* A lot of the form fields in HTML are very similar. Could programmatically construct parts of the HTML.
* Alternatives to embedded database. PostgreSQL?
* For the form fields
  * State could be a choice dropdown
  * Website should be validated as a proper URL
  * XXXXX-XXXX is a valid postal zip code format
* If there are hundreds of persons or clients, scrolling to add/remove contacts could get frustrating.
  * Maybe allow for user to type and filter the options.
  * Maybe on Client, have 1 block with current contacts and 1 block with available contacts, and user clicks to move contacts between the 2.
* If a user navigates away from the Edit/New page, maybe add pop-up indicating changes will be discarded and ask 'are you sure?'
* Client and Person have very similar logic. What else can be abstracted into general-purpose logic? It would be interesting to create 'standard' components/services that could be used to build any number of simple CRUD applications.
* Automated regression/unit testing