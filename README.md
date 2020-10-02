# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Create MongoDb Cluster and Get Connection MongoDb URI
- Set environment variables in `config.env` under `./config/env`
  * Set `MONGO_URI = <YOUR_MONGO_URI>`
  * Set `JWT_SECRET_KEY = <YOUR_SECRET_KEY>`
  * Set `JWT_EXPIRE = <AUTHENTICATION_EXPIRE_TIME>`
  * Set `JWT_COOKIE = <AUTHENTICATION_EXPIRE_TIME>`
  * Set `PORT = <YOUR_PORT>`
  * Set `NODE_ENV = <DEVELOPMENT | PRODUCTION>`


# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to JavaScript 
- [bcryptjs](https://github.com/dodo/node-slug) - Hashing Password
- [dotenv](https://github.com/motdotla/dotenv) - Zero-Dependency module that loads environment variables


## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also inncludes the routes we'll be using in the application.
- `config/` - This folder contains configuration for central location environment variables and other configurations.
- `routes/` - This folder contains the route definitions (user, account etc. ) for the API.
- `models/` - This folder contains the schema definitions for our Mongoose models (User, Account).
- `controllers/` - This folder contains controllers for our API.
- `middlewares/` - This folder contains middlewares for our API.
- `helpers/` - This folder contains helper functions for adapting 3rd party libraries for the API.


## Error Handling

In `middlewares/errors/errorHandler.js`, I define a error-handling middleware for handling Mongoose's errors and our own errors.

## Authentication

Requests are authenticated using the `Authorization` header and value `Bearer: {{token}}`. with a valid JWT. 

I define express middlewares in `middlewares/authorization/auth.js` that can be used to authenticate requests. The `required` middlewares returns `401` or `403`.
