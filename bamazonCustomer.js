// REQUIRED Packages
var mysql = require("mysql");
var table = require("")

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
  connection.end();
});

// Take customer order:
// function
function customerOrder() {
  inquirer.prompt([
    {
      name: "itemId",
      message: "Which item would you like to purchase?"
    },
    { 
      name: "stockQty",
      message: "How many would you like?"
    }


    

  ])
}

// Decrement stock from store inventory


