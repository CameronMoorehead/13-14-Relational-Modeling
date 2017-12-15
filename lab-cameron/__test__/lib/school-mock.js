'use strict';

const faker = require('faker');
const School = require('../../model/school');

const schoolMock = module.exports = {};

schoolMock.create = () => {
  return new School({
    title: faker.lorem.words(2),
    keywords: faker.lorem.words(5).split(' '),
  }).save();
};

schoolMock.createMany = howMany => {
  return Promise.all(new Array(howMany))
    .fill(0)
    .map(() => {
      schoolMock.create();
    });
};

schoolMock.remove = () => School.remove({});
