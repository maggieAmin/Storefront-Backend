/* Main migration SQL commands */

CREATE TABLE Products (
    id serial primary key,
    name varchar,
    price numeric
);

CREATE TABLE Users (
    id serial primary key,
    firstname varchar,
    lastname varchar,
    password varchar
);

CREATE TABLE Orders (
    id serial primary key,
    user_id integer,
    status_of_order varchar,
    CONSTRAINT orders_fk FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
);

CREATE TABLE OrderProducts (
    order_id integer,
    product_id integer,
    quantity integer,
    CONSTRAINT OrderProducts_orders_fk FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE,
    CONSTRAINT OrderProducts_products_fk FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE
);
