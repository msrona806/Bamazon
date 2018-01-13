// REQUIRED Packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// connection to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Sidley",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  customerOrder();
});

// Take customer order:
// function
function customerOrder() {
  inquirer.prompt([
    {
      name: "itemId",
      type: "input",
      message: "Which item would you like to purchase?"
    },
    { 
      name: "stockQty",
      type: "input",
      message: "How many would you like?"
    }
  ])
} connection.end();


// Decrement stock from store inventory:
// determine how many are in store inventory

