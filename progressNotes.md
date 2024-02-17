# Done

Client will be similar to Person, so start with refactoring to reduce work later.
* Move SQL queries into a separate file. Easier to review all SQL functionality.
* Convert from Thymeleaf to Angular.
  * Delete Person doesn't need to be a separate page. A dialog box will suffice.
  * Edit and New can be combined into 1 component to reduce duplication
  * Use validators to implement front-end equivalent to back-end validation
  * Create services to handle all requests to back end
* Convert API endpoints to REST conventions

Implement Client
* Essentially copy and adjust sources for Person

Implement Client-Person relationship
* Person has "associated client" and Client has "associated contacts". So client can have any number of contacts (including 0) and person can only have 1.
* 2 database options to define the relationship
  * Add a client column to the person table, foreign key to client.client_id
  * Add a new table contact, mapping between person_id and client_id
  * Mapping table has the most flexibility, so will go forward with that.
* On Person List, add column to display client
* On Person Edit/Create, add dropdown field to select client.
* On Client List, add column to display contacts
* On Client Edit/Create, add multi-select field for contacts
  * Since person can only be contact for 1 client, need to filter options. 
  * GET /person retrieves the person list, so could add query parameters to adjust the query.
  * ?clientId=<id> returns persons associated with the client and those without a client
  * ?newClient=true returns persons that don't have a client

# TODO

* Client list - contacts aren't displaying on multiple lines
* Make sure code style is consistent across all sources
* Run code analysis
* Phone number: strip out dashes when filing to database, display to user with dashes
* Test all error handling

## Story #2

Add client-side styling and validation:
* Using your preferred javascript validation technique, prevent the submission on invalid data on the edit forms and inform the user of errors. The validations implemented on the front­end should be equivalent to the existing server side validation.
* Add standard styling to the pages using a modern CSS3/HTML5 framework like Twitter Bootstrap or Foundation (or similar).
