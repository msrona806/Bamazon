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

// menu options
function menu() {
  inquirer.prompt ({
      name: 'menuItems',
      type: 'list',
      message: (chalk.white('What would you like to do? Choose an option from the list:')),
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', chalk.red('Exit')]
    })
  .then(function(mgrResp) {
    switch (mgrResp.menuItems) {
      case "View Products for Sale":
      products();
      break;
    
      case "View Low Inventory":
      lowInventory();
      break;

      case "Add New Product":
      addProduct();
      break;
    } 
  });  
}
  
// View products for sale
function products() {
  chalkAnimation.rainbow("Welcome to Bamazon!!!", 1);
  connection.query('SELECT * FROM products', function(err, res) {
    console.table(res);
      menu();
  })
}
// View low inventory
function lowInventory() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 10 ', function(err, res) {
    console.table(res);
      menu();
  })
}

// Add new product
function addProduct() {
  inquirer.prompt([
    {
      name: "itemId",
      type: "input",
      message: "What is the product Id?"
    },
    {
      name: "product",
      type: "input",
      message: "What product are you adding?"
    },
    {
      name: "dept",
      type: "input",
      message: "What department will it go in?"
    },
    {
      name: "price",
      type: "input",
      message: "How much does it cost?"
    },
    {
      name: "qty",
      type: "input",
      message: "How many are you adding?"
    }
  ])
  .then(function(ans) {
    // Add products to table
    connection.query('INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) VALUES ?',
      [ans.itemId, ans.product, ans.dept, ans.price, ans.qty],
      
      function(err, res) {
        if (err) throw err;
        console.log("added!");
        menu();
    })
  });
}