CREATE DATABASE dbContacts;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone_number VARCHAR(20)
);

INSERT INTO contacts VALUES(1, "Rahul", "Ghanghas", "rahul@gmail.com", "4804083232");