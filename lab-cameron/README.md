# Express and Mongo REST API

A simple HTTP Server using Express with MongoDB for persistence

# Tech Used

- Node.js
- Express
- MongoDB
- mongoose ORM
- body-parser
- dot-env
- winston
- faker
- jest
- superagent
- http-error

# Features

GET, POST, and DELETE requests on path `/api/userAccounts/<user-id>`

All user accounts have a mongoose Schema which include a `name`, a `description`,
and an optional `location` property.

# Code Example / API Reference

### POST
`POST /api/userAccounts` will add a single user in MongoDB

### GET
`GET /api/userAccounts` will return all users in MongoDB as an array
`GET /api/userAccounts/<user-id>` will return a single user with the specified id

### DELETE
`DELETE /api/userAccounts/<user-id>` will delete a single user from MongoDB with the specified id

# Installation

1. clone this repo
2. Setup PORT and MongoDB URI in .env file
3. run `npm run dbon` to turn on MongoDB
4. run `npm run dboff` to turn off MongoDB

# Tests

All unit tests and mocks done using jest, faker and superagent

# Credits

Cameron Moorehead - https://github.com/CameronMoorehead

# License

GPL-3.0

