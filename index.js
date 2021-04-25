const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "company_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("conneced!");
  startSearch();
});

const startSearch = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees by department",
        "View All Employees by manager",
        "Add Employee",
        "Update Employee",
        "Update Employee by manager",
        "View All Roles",
        "Remove Employee",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          employeeSearch();
          break;

        case "View All Employees by department":
          employeeDepartmentSearch();
          break;

        case "View All Employees by manager":
          employeeManagerSearch();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        case "Update Employee by manager":
          updateEmployeeManager();
          break;

        case "View All Roles":
          roleSearch();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const employeeSearch = () => {
  const query =
    "SELECT * FROM employee";
  connection.query(query, (err, res) => {
   console.table(res)
  });
  startSearch();
};

const employeeDepartmentSearch = () => {
  const query = "SELECT ";
  connection.query();
  startSearch();
};

const employeeManagerSearch = () => {
  const query = "SELECT ";
  connection.query();
  startSearch();
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter Employee First Name: ",
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter Employee Last Name: ",
      },
      {
        name: "employeeRole",
        type: "list",
        message: "Employee Role: ",
        choices: [
          "Sales Lead",
          "Sales Person",
          "Lead Engineer",
          "Software Engineer",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
      {
        name: "employeeManager",
        type: "input",
        message: "Enter Employees Manager: ",
      },
    ])
    .then((answer) => {
      const query = "SELECT ";
      connection.query();
      startSearch();
    });
};

const updateEmployee = () => {
  const query = "SELECT ";
  connection.query();
  startSearch();
};

const updateEmployeeManager = () => {
  const query = "SELECT ";
  connection.query();
  startSearch();
};

const roleSearch = () => {
  const query =
    "SELECT ";
  connection.query(query, (err, res) => {});
  startSearch();
};

const removeEmployee = () => {
  const query =
    "SELECT ";
  connection.query(query, (err, res) => {});
  startSearch();
};