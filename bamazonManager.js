var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});
connection.connect(function (err) {
    if (err) throw err;
    menu();
});

function menu () {
    inquirer
    .prompt ([
        {
            name: "command",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ])
    .then(function (answer) {
        //console.log(answer)
        switch (answer.command) {
            case "View Products for Sale":
            forSale()
            break;
            case "View Low Inventory":
            lowInventory()
            break;
            case "Add to Inventory":
            addInventory()
            break;
            case "Add New Product":
            newProduct()
            break;
        }
    })
}

function forSale(){
    connection.query("SELECT * FROM products", function (err, res){
        if (err) throw err;
        console.log("Available Items:")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("\n------------------------------------------");
        menu();
    })
}

function lowInventory () {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res){
        if (err) throw err;
        console.log("!!Low Inventory!!: ")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("\n------------------------------------------");
         menu();
    })
}  

function addInventory () {
    connection.query ("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("Items Available:")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity);
        }
        inquirer
        .prompt([
            {
                name: "itemId",
                type: "input",
                message: "What item ID would you like to add more of?"
            },
            {
                name: "unit",
                type: "input",
                message: "How much?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } return false;
                }
            },
        ])
        .then(function (answer){
            connection.query("SELECT * FROM products", function (err, res){
                if (err) throw err;
                var moreItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_id === parseInt(answer.itemId)) {
                        moreItem = res[i];   
                    }
                }
                var sum = moreItem.stock_quantity + parseInt(answer.unit)
                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: sum
                    },
                    {
                        item_id: moreItem.item_id
                    }
                ], function (err, res) {
                    if (err) throw err;
                    console.log(moreItem.product_name + " Stock quantity: " + sum);
                    console.log("\n------------------------------------------");
                    menu ();
                });
            })
        })
    })
}

function newProduct () {
    inquirer
    .prompt([
        {
            name: "product",
            type: "input",
            message: "What new product do you want to add to inventory?"
        },
        {
            name: "department",
            type: "input",
            message: "What department is item categorized in?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the price of new item?",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return false;
                }  
        },
        {
            name: "quantity",
            type: "input",
            message: "How much will you stock of item?",
            validate: function(value) {
                if (isNaN(value) === false) {
                return true;
                }
                return false;
                } 
        },
    ])
    .then(function(answer) { 
    connection.query("INSERT INTO products SET ?",
    {
        product_name: answer.product,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.quantity
    },
    function(err) {
        if (err) throw err;
        console.log(answer.product + " was added into Inventory. \n")
        console.log("\n------------------------------------------");
        menu ();
    }
)
})
}

