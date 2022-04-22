# STOREFRONTE
## Project description
Setting up an online store to make the company great product ideas available for purchase and they want you and your co-worker to build it.

The stakeholders have put together a list of requirements for this online store. Your co-worker will be building the frontend and you will be supplying the JavaScript API. The requirements have been collected into requirements document in REQUIREMENTS.md

For my application I added tests, and to keep user information secure, I provided a user authentication endpoint to perform login and provide JWT tokens that are ready to integrate with the frontend.


## Installation Instructions

### Setup database on machine
1. Assuming you installed postgres on your machine. Change to the postgres user (you might need to use `sudo`) `$ su postgres` 
1. Start psql `$ psql postgres`
1. Create databaseuser 'shopping_user' we're using `password123` as password but you can choose a different one as long as you change it in the `.env` file
```
CREATE DATABASE shopping_user WITH PASSWORD 'password123';
```
1. Create databases 'shopping' and 'shopping_test
```
CREATE DATABASE shopping;
CREATE DATABASE shopping_test;
```
1. Grant 'shopping_user' the required permissions
```
GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
GRANT ALL PRIVILEGES ON DATABASE shopping_TEST TO shopping_user;
```
1. The database migration `$ db -migrate up`

### Setup application on machine
1. Extract the submission ZIP
1. Even though `.env` file should not be shared, we included it in this submission as requested in the project checklist. Otherwise, you should create a `.env` file with the following env variables to include in it
```
POSTGRES_HOST='127.0.0.1'
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=super-secret-shopping-fun
SALT_ROUNDS=6
TOKEN_KEY=super-secret-shopping-auth
```
1. Open a terminal and change directory to the project root....
1. Install the dependencies `$ npm install`
1. Run the DB migration `$ db-migrate up`
1. Build the project `$ npm run build`
1. Run tests `$ npm run build`
1. Start the server `$ npm run start` OR using `$ node dist/index.js`
1. Install postman 

## Project structure

1. Updated REQUIREMENTS.md
1. package.json
1. database.json
1. Model Folder
1. Handler Folder
1. Migrations Folder
1. Model and Endpoint Tests

## README & Requirements Documentation

1. RESTful routes for the required endpointes
1. Each RESTful route associated with the correct HTTP verb
1. The REQUIREMENTS.md includes a database schema that has tables and columns that address the API endpoints and data shapes given in the REQUIREMENTS.md including column types. 
1. A PostgreSQL database that is connected to the Node API.
1. The requirements document contains a database schema with table names and types. The schema connects to address all the requirements listed in REQUIREMENT.md.
1. Migration files for the creation of each table and its columns in the database.
1. Each up migration has it matching down migration.
1. Running ‘db-migrate up’ results in the creation of a database that can connect to the project.
1. Encrypt the password field on the user table using the bcrypt library.
1. Split the routes into grouped handler files for better code organization. All the routes listed in REQUIREMENTS.md are be present.
1. All required tables/columns in the database are represented in the models.
   
### Secure database access info with environment variables
1. Used dotenv to create environment variables.
1. The dotenv file is present in the `.gitignore` file.

### Authentication & Testing
* Project endpoint tests run and pass. Every endpoint have one test associated with it to pass. All required endpoints can be found in the REQUIREMENTS.md.
* JWTs have the following:
  * Part of the HTTP response.
  * Validated on requests requiring JWT (user secure routes).
  * Generated for each user.
* You can test by submitting HTTP requests (with postman for example). The application these are the addresses and ports used by the project configuration
  * DB Host: '127.0.0.1'
  * DB Port: 5432
  * Application address: '0.0.0.0' (Since CORS is enabled other `localhost` aliases won't work)
  * Application port: 3000