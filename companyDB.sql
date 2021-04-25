DROP DATABASE IF EXISTS company_DB;
CREATE database company_DB;

USE company_DB;

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT ,
  role_id INTEGER,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INTEGER(10),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  role_id INTEGER(10),
  title VARCHAR(30),
  salary DECIMAl(10,2),
  department_id INTEGER(10),
  PRIMARY KEY (department_id)
);

CREATE TABLE department (
  id INTEGER (10),
  name VARCHAR(30),
  PRIMARY KEY (id)
);



INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, "Carol", "Smith", 2);

INSERT INTO role (role_id, title, salary, department_id)
VALUES (1, "Manager", 75000, 2);

SELECT * FROM employee;
SELECT * from role;