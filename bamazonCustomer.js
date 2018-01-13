// REQUIRED Packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

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
  products();
});

// **** FUNCTIONS ****

// Display product table
function products() {
  connection.query('SELECT * FROM products', function(err, res) {
    console.table(res);
    customerOrder();
  });
}

// Take customer order:
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
  .then(function(userReq) {
    updateStock(userReq.stockQty, userReq.itemId) 
    products();
    // connection.end();
  })
} 

// Decrement stock from store inventory:
function updateStock (qty, id) {
  connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [qty, id], function(err, res){
  })
}


// don't let inventory go past 0
// function to end connection, when user quits


