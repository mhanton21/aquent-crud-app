package com.aquent.crudapp.person;

import java.util.List;

import org.springframework.stereotype.Repository;

/**
 * Operations on the "person" table.
 */
@Repository
public interface PersonDao {

    /**
     * Retrieves all of the person records.
     *
     * @return list of person records
     */
    List<Person> listPeople();

    /**
     * Retrieves persons available for new client
     * @return list of person records
     */
    List<Person> listPeopleForNewClient();

    /**
     * Retrieves persons available for existing client
     * @param clientId ID of the client
     * @return list of person records
     */
    List<Person> listPeopleForExistingClient(Integer clientId);

    /**
     * Creates a new person record.
     *
     * @param person the values to save
     * @return the new person ID
     */
    Integer createPerson(Person person);

    /**
     * Retrieves a person record by ID.
     *
     * @param id the person ID
     * @return the person record
     */
    Person readPerson(Integer id);

    /**
     * Updates an existing person record.
     *
     * @param person the new values to save
     */
    void updatePerson(Person person);

    /**
     * Deletes a person record by ID.
     *
     * @param id the person ID
     */
    void deletePerson(Integer id);
}
