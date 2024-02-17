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

# TODO

* Make sure code style is consistent across all sources
* Run code analysis
* Phone number: strip out dashes when filing to database, display to user with dashes
* Test all error handling

## Story #1

* Clients can have zero, one, or multiple associated contacts.
* When editing a person, the user should be able to choose the associated client.
* When viewing a person, the associated client should be shown.
* When viewing a client, the associated contacts should be shown.
* When editing a client, the user should be able to add or remove associated contacts.

## Story #2

Add client-side styling and validation:
* Using your preferred javascript validation technique, prevent the submission on invalid data on the edit forms and inform the user of errors. The validations implemented on the front­end should be equivalent to the existing server side validation.
* Add standard styling to the pages using a modern CSS3/HTML5 framework like Twitter Bootstrap or Foundation (or similar).
