DROP DATABASE IF EXISTS company_DB;
CREATE database company_DB;

USE company_DB;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  role_id INTEGER,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULl,
  title VARCHAR(30),
  salary DECIMAl(10,2),
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULl,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, "Carol", "Smith", 2);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (2, "John", "Taylor", 2);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (3, "Mark", "Jackson", 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 75000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 60000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Person", 50000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 100000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ("Sogtware Engineer", 85000, 6);

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;