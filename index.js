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
        "View All Departments",
        "View All Employees by manager",
        "Add Employee",
        "Update Employee Role",
        // "Update Employee by manager",
        "View All Roles",
        "Remove Employee",
        "Add a Department",
        "Add a Role",
        "Remove a Role",
        "Remove a Department",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          employeeSearch();
          break;

        case "View All Departments":
          employeeDepartmentSearch();
          break;

        case "View All Employees by manager":
          employeeManagerSearch();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        // case "Update Employee by manager":
        //   updateEmployeeManager();
        //   break;

        case "View All Roles":
          roleSearch();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Add a Department":
          addDepartment();
          break;

        case "Add a Role":
          addRole();
          break;

        case "Remove a Role":
          removeRole();
          break;

        case "Remove a Department":
          removeDepartment();
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

//View All Departments
const employeeDepartmentSearch = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    console.table(res);
    startSearch();
  });
};

//View Employees By Manager
const employeeManagerSearch = () => {
  connection.query("SELECT role_id, first_name FROM employee", (err, res) => {
    let managers = res.map((mngr) => ({
      name: mngr.first_name,
      value: mngr.id,
    }));
    inquirer
      .prompt([
        {
          name: "manager_id",
          type: "list",
          message: "Choose Manager you would like to view employees by: ",
          choices: managers,
        },
      ])
      .then((answer) => {
        connection.query(
          "SELECT * FROM employee WHERE ?",
          [
            {
              manager_id: answer.manager_id,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.table(res);
            startSearch();
          }
        );
      });
  });
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
        //need to query managers
        // {
        //   name: "employeeManager",
        //   type: "input",
        //   message: "Choose Employees Manager: ",
        //   choices: ,
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
              //   manager_id: answer.employeeManager,
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
            message: "Which Employees role would you like to update? ",
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
              console.log(`${res.affectedRows} Employee role updated!\n`);
              startSearch();
            }
          );
        });
    });
  });
};
// const updateEmployeeManager = () => {
//   connection.query("SELECT * FROM employee", (err, res) => {
//     let employees = res.map((emp) => ({
//       name: `${emp.first_name} ${emp.last_name}`,
//       value: emp.id,
//     }));
//     connection.query("SELECT * FROM role", (err, res) => {
//       // let roles = res.map((emp) => ({ name: emp.title, value: emp.id }));
//       // need to query in managers
//       inquirer
//         .prompt([
//           {
//             name: "employeeManagerToUpdate",
//             type: "list",
//             message: "Which Employees manager would you like to update? ",
//             choices: employees,
//           },
//           {
//             name: "employeeManager",
//             type: "list",
//             message: "Which Manager would you like to up date employee too? ",
//             choices: a,
//             //need to query in managers
//           },
//         ])
//         .then((answer) => {
//           connection.query(
//             "UPDATE employee SET ? WHERE ?",
//             [
//               {
//                 manager_id: answer.employeeManager,
//               },
//               {
//                 id: answer.employeeManagerToUpdate,
//               },
//             ],
//             (err, res) => {
//               if (err) throw err;
//               console.log(`${res.affectedRows} Employee role updated!\n`);
//               startSearch();
//             }
//           );
//         });
//     });
//   });
// };

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

// Add a Department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "Add a department name: ",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        { name: answer.department },
        (err, res) => {
          if (err) throw err;
          console.log("Added new department");
          startSearch();
        }
      );
    });
}

// Add a Role
function addRole() {
  connection.query("SELECT * FROM department", (err, res) => {
    let departments = res.map((dept) => ({
      name: dept.name,
      value: dept.id,
    }));
    inquirer
      .prompt([
        {
          name: "role",
          type: "input",
          message: "Enter name of new Role: ",
        },
        {
          name: "salary",
          type: "input",
          message: "Enter Salary of new Role: ",
        },
        {
          name: "department_id",
          type: "list",
          message: "Choose a department for the new Role: ",
          choices: departments,
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.role,
            salary: answer.salary,
            department_id: answer.department_id,
          },
          (err, res) => {
            if (err) throw err;
            console.log("Added new role");
            startSearch();
          }
        );
      });
  });
}

//Remove a Role
const removeRole = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    let roles = res.map((emp) => ({
      name: emp.title,
      value: emp.id,
    }));
    inquirer
      .prompt([
        {
          name: "roleToRemove",
          type: "list",
          message: "Which Role would you like to remove? ",
          choices: roles,
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM role WHERE ?",
          [
            {
              id: answer.roleToRemove,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} Role removed.\n`);
            startSearch();
          }
        );
      });
  });
};

//Remove a Role
const removeDepartment = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    let departments = res.map((dept) => ({
      name: dept.name,
      value: dept.id,
    }));
    inquirer
      .prompt([
        {
          name: "deptToRemove",
          type: "list",
          message: "Which Department would you like to remove? ",
          choices: departments,
        },
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM department WHERE ?",
          [
            {
              id: answer.deptToRemove,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} Department removed.\n`);
            startSearch();
          }
        );
      });
  });
};
