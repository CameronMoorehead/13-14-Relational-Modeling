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

GET, POST, and DELETE requests on path `/api/students/<user-id>`

All student accounts have a mongoose Schema which include a `name`, an `age`,
and an optional `description` property.

# Code Example / API Reference

### POST
`POST /api/students` will add a single student in MongoDB

### GET
`GET /api/students` will return all students in MongoDB as an array
`GET /api/students/<user-id>` will return a single student with the specified id

### DELETE
`DELETE /api/students/<user-id>` will delete a single student from MongoDB with the specified id

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
