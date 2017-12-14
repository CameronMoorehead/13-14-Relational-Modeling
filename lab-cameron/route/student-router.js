'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();
const httpErrors = require('http-errors');

const logger = require('../lib/logger');
const Student = require('../model/student');

const studentRouter = module.exports = new Router();

studentRouter.post('/api/students', jsonParser, (request, response, next) => {
  if (!request.body.name || !request.body.age) {
    console.log('faker taking too long?');
    return next(httpErrors(400, 'name and age are required'));
  }

  return new Student(request.body).save()
    .then(student => response.json(student))
    .catch(next);
});

studentRouter.get('/api/students/:id', (request, response, next) => {
  Student.findById(request.params.id)
    .then(student => {
      if (!student) {
        throw httpErrors(404, 'student not found');
      }
      logger.log('info', 'GET - returning a 200 status code');
      logger.log('info', student);

      return response.json(student);
    })
    .catch(next);
});

studentRouter.get('/api/students', (request, response, next) => {
  Student.find({})
    .then(student => {
      logger.log('info', 'GET - returning a 200 status code');
      logger.log('info', student);

      return response.json(student);
    })
    .catch(next);
});

studentRouter.put('/api/students/:id', jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };

  Student.findByIdAndUpdate(request.params.id, request.body, options)
    .then(student => {
      if (!student) {
        throw httpErrors(404, 'student with id not found');
      }
      logger.log('info', 'PUT - returning a 200 status code');
      logger.log('info', student);

      return response.json(student);
    })
    .catch(next);
});

studentRouter.delete('/api/students/:id', (request, response, next) => {
  Student.findOneAndRemove(request.params.id)
    .then(student => {
      if (!student) {
        throw httpErrors(404, 'student with id not found');
      }
      logger.log('info', 'DELETE - returning a 204 status code');
      logger.log('info', student);

      return response.sendStatus(204);
    })
    .catch(next);
});

studentRouter.delete('/api/students', (request, response, next) => {
  logger.log('info', 'DELETE - returning a 400 status code. No id provided');
  return next(httpErrors(400, 'id required'));
});
