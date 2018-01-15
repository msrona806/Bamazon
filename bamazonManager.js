// REQUIRED Packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
const chalk = require("chalk");
const chalkAnimation = require("chalk-animation");

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
  menu();
});

// **** FUNCTIONS ****

// Display product table
function products() {
  chalkAnimation.rainbow("Welcome to Bamazon!!!", 1);
  connection.query('SELECT * FROM products', function(err, res) {
    console.table(res);
    connection.end();
    menu();
  });
}

// menu options
function menu() {
  inquirer.prompt ({
      name: 'menuItems',
      type: 'list',
      message: (chalk.white('What would you like to do? Choose from an item from the list:')),
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    })
  // .then(function(mgrResp) {
  //   console.log(mgrResp.menuItems);
  // });
  }
  

// View products for sale

// View low inventory

// Add new product