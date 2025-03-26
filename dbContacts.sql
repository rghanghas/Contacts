CREATE DATABASE dbContacts;

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone_number VARCHAR(20)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

ALTER TABLE contacts 
ADD COLUMN user_id INT,
ADD CONSTRAINT fk_user 
FOREIGN KEY (user_id) REFERENCES users(id);

INSERT INTO contacts VALUES(1, "Rahul", "Ghanghas", "rahul@gmail.com", "4804083232");

SELECT * FROM contacts;