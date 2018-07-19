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
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Items Available:")
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " => $" + res[i].price);
        }
        post();
    });
};

function post() {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "input",
                message: "What is the ID of the product you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } return false;
                }
            },
            {
                name: "unit",
                type: "input",
                message: "How many products of the unit would you like to buy?"
            },
        ])
        .then(function (answer) {
            connection.query("SELECT * FROM products", function (err, results) {
                if (err) throw err;
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.choice)) {
                        chosenItem = results[i];
                        //console.log(chosenItem)
                    }
                }
                if (chosenItem.stock_quantity > parseInt(answer.unit)) {
                    var diff = chosenItem.stock_quantity - parseInt(answer.unit)
                    //console.log(answer.unit)
                    //console.log(chosenItem.stock_quantity)
                    //console.log(diff)
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: diff
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ], function (err, results) {
                            if (err) throw err;
                            var total = chosenItem.price * answer.unit
                            console.log(total)
                            console.log("Total cost: $" + total + "\n");
                            console.log("------------------------------------------");
                            start();
                        });
                } else {
                    console.log("Insufficient quantity!\n")
                    console.log("------------------------------------------");
                    start();
                }
            });
        });
}