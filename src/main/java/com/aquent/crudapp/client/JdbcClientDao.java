package com.aquent.crudapp.client;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring JDBC implementation of {@link ClientDao}.
 */
@Component
public class JdbcClientDao implements ClientDao {

    private Properties sqlQueries = new Properties();

    private final NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public JdbcClientDao(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;

        try (FileInputStream fis = new FileInputStream("src/main/resources/sql.properties")) {
            this.sqlQueries.load(fis);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load SQL properties", e);
        }
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public List<Client> listClients() {
        List<Client> clients = namedParameterJdbcTemplate.getJdbcOperations().query(
                sqlQueries.getProperty("sql.list_clients"),
                new ClientRowMapper());
        for (Client client : clients) {
            readContacts(client);
        }
        return clients;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public Client readClient(Integer clientId) {
        Client client = namedParameterJdbcTemplate.queryForObject(
                sqlQueries.getProperty("sql.get_client"),
                Collections.singletonMap("clientId", clientId),
                new ClientRowMapper());
        if (client != null) {
            readContacts(client);
        }
        return client;
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public void deleteClient(Integer clientId) {
        namedParameterJdbcTemplate.update(
                sqlQueries.getProperty("sql.delete_client"),
                Collections.singletonMap("clientId", clientId));
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public void updateClient(Client client) {
        namedParameterJdbcTemplate.update(
                sqlQueries.getProperty("sql.update_client"),
                new BeanPropertySqlParameterSource(client));
        namedParameterJdbcTemplate.update(
                sqlQueries.getProperty("sql.delete_client_contacts"),
                Collections.singletonMap("clientId", client.getClientId()));
        createContacts(client);
    }

    @Override
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = false)
    public Integer createClient(Client client) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        namedParameterJdbcTemplate.update(
                sqlQueries.getProperty("sql.insert_client"),
                new BeanPropertySqlParameterSource(client),
                keyHolder);
        Integer clientId = keyHolder.getKey().intValue();
        client.setClientId(clientId);
        createContacts(client);
        return clientId;
    }

    private void readContacts(Client client) {
        SqlParameterSource params = new MapSqlParameterSource("clientId", client.getClientId());
        List<Integer> contacts = namedParameterJdbcTemplate.query(
                sqlQueries.getProperty("sql.list_client_contacts"),
                params,
                (rs, rowNum) -> rs.getInt("person_id"));
        client.addContactIds(contacts);
    }

    private void createContacts(Client client) {
       for (Integer contactId : client.getContactIds()) {
           SqlParameterSource params = new MapSqlParameterSource()
                   .addValue("clientId", client.getClientId().intValue())
                   .addValue("personId", contactId.intValue());
           namedParameterJdbcTemplate.update(
                   sqlQueries.getProperty("sql.insert_contact"),
                   params);
       }
    }

    /**
     * Row mapper for client records.
     */
    private static final class ClientRowMapper implements RowMapper<Client> {

        @Override
        public Client mapRow(ResultSet rs, int rowNum) throws SQLException {
            Client client = new Client();
            client.setClientId(rs.getInt("client_id"));
            client.setCompanyName(rs.getString("company_name"));
            client.setWebsiteUri(rs.getString("website_uri"));
            client.setPhoneNumber(rs.getString("phone_number"));
            client.setStreetAddress(rs.getString("street_address"));
            client.setCity(rs.getString("city"));
            client.setState(rs.getString("state"));
            client.setZipCode(rs.getString("zip_code"));
            return client;
        }
    }
}
