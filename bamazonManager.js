// REQUIRED Packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
const chalk = require("chalk");
const chalkAnimation = require("chalk-animation");
chalkAnimation.rainbow("Welcome to Bamazon!!!", 1);

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
  products();
});

// **** FUNCTIONS ****

// Display product table
function products() {
  connection.query('SELECT * FROM products', function(err, res) {
    console.table(res);
    console.log(chalk.yellow("***Enter 'Q' and press enter twice to exit store***"));
    connection.end();
  });
}
