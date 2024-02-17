package com.aquent.crudapp.person;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

/**
 * Controller for handling basic person management operations.
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("person")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    /**
     * Returns data for the listing page.
     *
     * @return the current list of people
     */
    @GetMapping(value = "list")
    public List<Person> list() {
        return personService.listPeople();
    }

    /**
     * Validates and saves a new person.
     * On success, returns the new person.
     * On failure, returns the validation errors.
     *
     * @param person populated form bean for the person
     * @return new person, or validation errors
     */
    @PostMapping(value = "")
    public ResponseEntity<?> create(@RequestBody Person person) {
        List<String> errors = personService.validatePerson(person);
        if (errors.isEmpty()) {
            Integer personId = personService.createPerson(person);
            Person createdPerson = personService.readPerson(personId);
            return ResponseEntity.ok(createdPerson);
        } else {
            return ResponseEntity.badRequest().body(errors);
        }
    }

    /**
     * Validates and saves an edited person.
     * On success, returns the updated person.
     * On failure, returns the validation errors.
     *
     * @param person populated form bean for the person
     * @return updated person, or validation errors
     */
    @PutMapping(value = "")
    public ResponseEntity<?> edit(@RequestBody Person person) {
        List<String> errors = personService.validatePerson(person);
        if (errors.isEmpty()) {
            Integer personId = person.getPersonId();
            personService.updatePerson(person);
            Person updatedPerson = personService.readPerson(personId);
            return ResponseEntity.ok(updatedPerson);
        } else {
            return ResponseEntity.badRequest().body(errors);
        }
    }

    /**
     * Retrieves a person record.
     *
     * @param personId the ID of the person to retrieve
     */
    @GetMapping(value="/{personId}")
    public Person read(@PathVariable Integer personId) {
        return personService.readPerson(personId);
    }

    /**
     * Deletes a person record.
     *
     * @param personId the ID of the person to delete
     */
    @DeleteMapping(value="/{personId}")
    public void delete(@PathVariable Integer personId) {
        personService.deletePerson(personId);
    }
}
