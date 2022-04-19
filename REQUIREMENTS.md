# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index -> `GET /products/`
- Show (args: product id) -> `GET /products/:id`
- Create (args: Product)[token required] -> `POST /products/` **required**: JWToken: (user role:admin)
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] -> `GET /users/` **required**: JWToken: (user role:admin)
- Show (args: id)[token required] -> `GET /users/:id` **required**: JWToken: (user:id role:admin)
- Create (args: User)[token required] -> `POST /users/` **required**: JWToken: (user role:admin/user)

#### Orders
- Current Order by user (args: user id)[token required] -> `GET /orders/:user_id` **required**: JWToken: (user:id role:admin)
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Products
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


## Database tables
#### Products
- id:integer (primary key)
- name:varchar
- price:number
- [OPTIONAL] category

#### Users
- id:integer (primary key)
- firstName:varchar
- lastName:varchar
- password:varchar

#### Orders
- id:integer (primary key)
- user_id:integer (foreign key to users table)
- status_of_order (active or complete):varchar

#### OrderProducts
- order_id:integer (foreign key to orders table)
- product_id:integer (foreign key to products table)
- quantity:integer