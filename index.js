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
//View All Employees
const employeeSearch = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    console.table(res);
    startSearch();
  });
};
//View All Employees By Department
const employeeDepartmentSearch = () => {
  const query = "SELECT ";
  connection.query();
  startSearch();
};
//View Employees By Manager
const employeeManagerSearch = () => {
  const query = "SELECT ";
  connection.query();
  startSearch();
};

//Add Employee
const addEmployee = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    let roles = res.map((emp) => ({ name: emp.title, value: emp.id }));
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
          choices: roles,
        },
        // {
        //   name: "employeeManager",
        //   type: "input",
        //   message: "Enter Employees Manager: ",
        // },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO employee SET ?",
          [
            {
              first_name: answer.firstName,
            
              last_name: answer.lastName,
           
              role_id: answer.employeeRole,
            // 
            //   manager_id: answer.h,
            // 
            },
            
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} Employee added!\n`);
            startSearch();
          }
        );
      });
  });
};

//Update Employee
const updateEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    let employees = res.map((emp) => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    }));
    connection.query("SELECT * FROM role", (err, res) => {
      let roles = res.map((emp) => ({ name: emp.title, value: emp.id }));
      inquirer
        .prompt([
          {
            name: "employeeToUpdate",
            type: "list",
            message: "Which Employee would you like to update? ",
            choices: employees,
          },
          {
            name: "employeeRole",
            type: "list",
            message: "Employee Role: ",
            choices: roles,
          },
        ])
        .then((answer) => {
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: answer.employeeRole,
              },
              {
                id: answer.employeeToUpdate,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} Employee updated!\n`);
              startSearch();
            }
          );
        });
    });
  });
};
//Update Employee Manager
const updateEmployeeManager = () => {
  //list of employees to choose from to update manager
  const query = "SELECT ";
  connection.query();
  startSearch();
};
//View All Company Roles
const roleSearch = () => {
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    console.table(res);
  });
  startSearch();
};
//Remove an Employee
const removeEmployee = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    let employees = res.map((emp) => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    }));
    inquirer
      .prompt([
        {
          name: "employeeToRemove",
          type: "list",
          message: "Which Employee would you like to remove? ",
          choices: employees,
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM employee WHERE ?",
          [
            {
              id: answer.employeeToRemove,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} Employee removed.\n`);
            startSearch();
          }
        );
      });
  });
};