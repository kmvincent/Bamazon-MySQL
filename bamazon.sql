DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Instant Pot", "Home & Kitchen", 79.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Anova Sous Vide Precision Cooker", "Kitchen", 109.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Ant-Man", "Movies & TV", 12.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Sherlock: Season Four ", "Movies & TV", 22.96, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Cuisinart Cookware Set", "Kitchen", 123.99, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Weber Spirit Grill", "Garden & Outdoor", 499.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Black+Decker Mower", "Garden & Outdoor", 125.83, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Bissell Vacuum", "Home", 59.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Apple MacBook Pro", "Computers & Accessories", 1699.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity )
VALUES ("Echo (2nd Gen) Alexa", "Home & Kitchen", 69.99, 7);

SELECT * FROM products;