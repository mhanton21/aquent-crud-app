CREATE TABLE person (
    person_id integer IDENTITY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email_address varchar(50) NOT NULL,
    street_address varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(2) NOT NULL,
    zip_code varchar(5) NOT NULL
);

CREATE TABLE client (
    client_id integer IDENTITY,
    company_name varchar(50) NOT NULL,
    website_uri varchar(50) NOT NULL,
    phone_number varchar(20) NOT NULL,
    street_address varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(2) NOT NULL,
    zip_code varchar(5) NOT NULL
);

CREATE TABLE contact (
    client_id integer,
    person_id integer,
    CONSTRAINT fk_client_id FOREIGN KEY (client_id) REFERENCES client (client_id) ON DELETE CASCADE,
    CONSTRAINT fk_person_id FOREIGN KEY (person_id) REFERENCES person (person_id) ON DELETE CASCADE
);