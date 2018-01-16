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
    }])
  // Take answers from user response:
  .then(function(userReq) {
    // Pulling the item information for the customer selected item
    leaveStore(userReq.itemId);
    connection.query('SELECT * FROM products WHERE item_id = ?', [userReq.itemId], function(err, res) {
      if (err) throw err;
        var stockInv;
        var itemCost;

      for (i = 0; i < res.length; i++) {
        stockInv = res[i].stock_quantity;
        itemCost = res[i].price;
      }
      // Give an error msg if ordering more than in stockgit 
      if (stockInv < parseInt(userReq.stockQty)) {
        console.log(chalk.red("You cannot buy more than we have!"));
        buyMore(userReq.stockQty, userReq.itemId);
      }
      // Shows customer their total for items ordered
      else {
        console.log(chalk.magentaBright("Your total is: ") + userReq.stockQty * itemCost);
        // updateStock(userReq.stockQty, userReq.itemId)
        buyMore(userReq.stockQty, userReq.itemId); 
      }  
    });  
  });
}

 

// See if user wants to continue shopping
function buyMore(qty, id) {
  inquirer.prompt(
    {
      name: "continue",
      type: "confirm",
      message: "Would you like to continue shopping?"
    }
  ).then(function(answer) {
    // if the answer is yes, run customer order
    if (answer.continue === true) {
      updateStock(qty, id);
      products();

    }
    else {
      process.exit(0);
     }
  });
}

// Decrement stock from store inventory:
 function updateStock (qty, id) {
  connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [qty, id], function(err, res){
  }); console.log(qty + id);
}

// function to end connection, when user quits
  function leaveStore(choice) {
  if (choice == "Q") {
    process.exit(0);
  }
}








