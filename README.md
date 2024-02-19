# Aquent developer candidate project

## About the finished project

The code is available at https://github.com/mhanton21/aquent-crud-app. 

This CRUD web application now includes the ability to create, edit, delete, and list both Persons and Clients (companies), and the ability to designate people as contacts to clients. This is still a Maven project, using Spring Boot and Spring JDBC with an embedded database. Thymeleaf views were replaced with an Angular front end, and Bootstrap was introduced for styling and functionality. For more details, see progressNotes.md for notes about the development process.

This project was developed/built using the following:
* Maven
* Java 15 SDK
* Spring Boot 2.1.6
* Spring JDBC
* Angular 17.2.0
* Bootstrap 5.3.2
* IntelliJ IDEA

To build and run the project:
* Download from the repository
* Open project in preferred IDE
* To run the Angular front end, in a terminal window
  * cd to the `angular-front-end` directory and run `ng serve`.
  * If the build fails, install any missing dependencies, e.g.
    * Axios: run `npm install axios`
    * Bootstrap: run `ng add @ng-bootstrap/ng-bootstrap`
* To run the back end, in the IDE
  * Build the project. If the build fails, install any missing dependencies.
  * Run the application out of `com.aquent.crudapp.Application`
* In the browser, navigate to `http://localhost:4200/`, which will serve the Person Listing page. From there you can navigate between Persons and Clients.

## Project Instructions

You can find the code to use as the basis for this project at https://github.com/aquent/crud-app. Please fork the repo on GitHub and submit a link to your fork.

This is a Maven project. It is a simple CRUD web application known to work with Java 8. It uses Spring Boot with Thymeleaf views and Spring JDBC with an embedded database. The established features allow the user to manage a list of people with contact information.

Please implement the stories below to the best of your ability. Feel free to add features or technical improvements you feel are important or valuable as you see fit and have time. Be as creative as you want (even if that means using a completely different approach.) Feel free to correct our mistakes as well.

### Story #1

Add ability to manage clients (companies):

* The user should be able to create, edit, delete and list Clients.
* Clients should have a company name, website URI, phone number, and physical/mailing address.
* Clients can have zero, one, or multiple associated contacts.
* When editing a person, the user should be able to choose the associated client.
* When viewing a person, the associated client should be shown.
* When viewing a client, the associated contacts should be shown.
* When editing a client, the user should be able to add or remove associated contacts.

### Story #2

Add client-side styling and validation:

* Using your preferred javascript validation technique, prevent the submission on invalid data on the edit forms and inform the user of errors. The validations implemented on the front-end should be equivalent to the existing server side validation.
* Add standard styling to the pages using a modern CSS3/HTML5 framework like Twitter Bootstrap or Foundation (or similar).
