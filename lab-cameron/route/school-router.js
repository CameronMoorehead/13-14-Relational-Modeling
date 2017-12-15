'use strict';

const { Router } = require('express');
const httpErrors = require('http-errors');
const jsonParser = require('body-parser').json();
const School = require('../model/school');

const schoolRouter = module.exports = new Router();

schoolRouter.post('/api/schools', jsonParser, (request, response, next) => {
  if(!request.body.title)
    return next(httpErrors(400, 'school model requires a title'));

  return new School(request.body).save()
    .then(school => response.json(school))
    .catch(next);
});

schoolRouter.put('/api/schools/:id', jsonParser, (request, response, next) => {
  let options = {new : true, runValidators : true};

  School.findByIdAndUpdate(request.params.id, request.body, options)
    .then(school => {
      if(!school)
        throw httpErrors(404,'school not found');
      return response.json(school);
    })
    .catch(next);
});

schoolRouter.get('/api/schools/:id', (request, response, next) => {
  School.findById(request.params.id)
    .then(school => {
      if(!school)
        throw httpErrors(404,'school not found');
      return response.json(school);
    })
    .catch(next);
});


schoolRouter.delete('/api/schools/:id',(request,response,next) => {
  School.findByIdAndRemove(request.params.id)
    .then(school => {
      if(!school)
        throw httpErrors(404,'school not found');

      return response.sendStatus(204);
    })
    .catch(next);
});
