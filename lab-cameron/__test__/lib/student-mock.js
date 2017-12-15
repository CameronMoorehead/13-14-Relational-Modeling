'use strict';

const faker = require('faker');
const schoolMock = require('./school-mock');
const Student = require('../../model/student');

const studentMock = module.exports = {};

studentMock.create = () => {
  const mock = {};

  return schoolMock.create()
    .then(school => {
      mock.school = school;

      return new Student({
        name: faker.lorem.words(10),
        age: faker.random.number(2),
        description: faker.lorem.words(10),
        school: school._id,
      }).save();
    })
    .then(student => {
      mock.student = student;
      return mock;
    });
};

studentMock.createMany = howMany => {
  const mock = {};

  return schoolMock.create()
    .then(school => {
      mock.school = school;
      return Promise.all(new Array(howMany))
        .fill(0)
        .map(() => {
          return new Student({
            name: faker.lorem.words(10),
            age: faker.random.number(2),
            description: faker.lorem.words(10),
            school: school._id,
          }).save();
        });
    });
};

studentMock.remove = () => Promise.all([
  Student.remove({}),
  schoolMock.remove(),
]);
