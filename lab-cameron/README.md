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

GET, POST, PUT and DELETE requests on path `/api/students/<student-id>`

All student accounts have a mongoose Schema which include a `name`, an `age`,
and an optional `description` property.

# Code Example / API Reference

### POST
`POST /api/students` will add a single student in MongoDB

Success will respond with 200 status code
Unique key clashes will respond with a 409 status code
Bad requests will respond with a 400 status code

### GET
`GET /api/students` will return all students in MongoDB as an array
`GET /api/students/<student-id>` will return a single student with the specified id

Success will respond with a 200 status code
Bad requests will respond with a 400 status code

### PUT
`PUT /api/students/<student-id>` will allow for passed user properties in `send` to be edited

Success will respond with a 200 status code
Unique key clashes will respond with a 409 status code
If the id is invalid a 400 status code will be returned


### DELETE
`DELETE /api/students/<student-id>` will delete a single student from MongoDB with the specified id

Success will respond with a 204 status code
If the id does not exit a 404 status code will be returned

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
