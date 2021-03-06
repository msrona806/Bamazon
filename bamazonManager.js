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

      case "Add to Inventory":
      updateInv();
      break;

      case "Add New Product":
      addProduct();
      break;

      case chalk.red('Exit'):
      exitNow();
      break;
    } 
  });  
}
  
// View products for sale
function products() {
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
function addProduct(itemId, product, dept, price, qty) {
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
    connection.query('INSERT INTO products SET ?', {
      item_id: ans.itemId,
      product_name: ans.product, 
      department_name: ans.dept, 
      price: ans.price, 
      stock_quantity: ans.qty
    },
      function(err, res) {
        if (err) throw err;
        console.log(ans.itemId + " added!");
        menu();
    })
  });
}

// Update inventory
function updateInv() {
  inquirer.prompt([
    {
      name: "item",
      type: "input",
      message: "Enter item id for product you would like to add inventory to?"
    },
    {
      name: "stockQty",
      type: "input",
      message: "How many would you like to add?"
    }
  ])
  .then(function(ans) {
    // var itemName = connection.query('SELECT product_name WHERE item_id ?', [ans.item] )
    connection.query('UPDATE products SET ? WHERE ?', 
      [{ stock_quantity: ans.stockQty },
        {item_id: ans.item}],
      function(error) {
        if (error) throw err;
        console.log("Quatity updated");
        lowInventory();
        menu();
      })
    })
  }

// Exit program
function exitNow() {
  process.exit(0);
  console.log('See ya next time!');
}
