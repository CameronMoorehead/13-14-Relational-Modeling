'use strict';

process.env.PORT = 8080;

process.env.MONGODB_URI = 'mongodb://localhost/testing';

const faker = require('faker');
const superagent = require('superagent');
const Student = require('../model/student');
const server = require('../lib/server');

const apiURL = `http://localhost:${process.env.PORT}/api/students`;

const studentMockCreate = () => {
  return new Student({
    name: faker.lorem.words(10),
    age: faker.random.number(2),
    description: faker.lorem.words(10),
  }).save();
};

describe('/api/students', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(() => Student.remove({}));

  describe('POST /api/students', () => {
    test('should respond with a student and 200 status code if there is no error',  () => {
      // faker data taking too long to generate
      // const studentToPost = {
      //   name: faker.lorem.words(100),
      //   age: faker.random.number(100),
      //   description: faker.lorem.words(100),
      // };
      const studentToPost = {
        name: 'test',
        age: 10,
        description: 'test description',
      };
      return superagent.post(`${apiURL}`)
        .send(studentToPost)
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body._id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.name).toEqual(studentToPost.name);
          expect(response.body.age).toEqual(studentToPost.age);
          expect(response.body.description).toEqual(studentToPost.description);
        });
    });

    test('should respond with a 400 code if we send an incomplete student', () => {
      const studentToPost = {
        name: faker.lorem.words(10),
      };
      return superagent.post(`${apiURL}`)
        .send(studentToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should respond with a 409 status code if there is a unique key clash',  () => {
      // faker data taking too long to generate
      // const studentToPost = {
      //   name: faker.lorem.words(10),
      //   age: faker.random.number(2),
      //   description: faker.lorem.words(100),
      // };

      const studentToPost = {
        name: 'test',
        age: 10,
        description: 'test description',
      };
      return superagent.post(`${apiURL}`)
        .send(studentToPost)
        .then(() => {
          return superagent.post(`${apiURL}`)
            .send(studentToPost)
            .then(Promise.reject)
            .catch(response => {
              expect(response.status).toEqual(409);
            });
        });
    });
  });

  describe('PUT /api/students/:id', () => {
    test('should respond with a 200 status code and an updated student if student exists', () => {
      let studentToUpdate = null;

      return studentMockCreate()
        .then(student => {
          studentToUpdate = student;
          return superagent.put(`${apiURL}/${student._id}`)
            .send({ name: 'testing' });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('testing');
          expect(response.body.age).toEqual(studentToUpdate.age);
          expect(response.body.description).toEqual(studentToUpdate.description);
          expect(response.body._id).toEqual(studentToUpdate._id.toString());
        });
    });

    test('should respond with a 404 status code if id is not found', () => {
      return superagent.put(`${apiURL}/invalidId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with a 409 status code if there is a unique key clash', () => {
      let duplicateStudent = null;
      let studentToPost = null;
      
      return studentMockCreate()
        .then(student => {
          studentToPost = student;
          return studentMockCreate()
            .then(student => {
              duplicateStudent = student;
              return superagent.put(`${apiURL}/${studentToPost._id}`)
                .send({ name: duplicateStudent.name })
                .then(Promise.reject)
                .catch(response => {
                  expect(response.status).toEqual(409);
                });
            });
        });
    });
  });

  describe('GET /api/students', () => {
    test('should respond with a 200 status code and a single student if student exists', () => {
      let studentToTest = null;

      return studentMockCreate()
        .then(student => {
          studentToTest = student;
          return superagent.get(`${apiURL}/${student._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(studentToTest.name);
          expect(response.body.age).toEqual(studentToTest.age);
          expect(response.body.description).toEqual(studentToTest.description);
          expect(response.body._id).toEqual(studentToTest._id.toString());
        });
    });

    test('should respond with a 200 status code and all students if no id is provided', () => {
      const studentArrayToTest = [];

      return studentMockCreate()
        .then(student=> {
          studentArrayToTest.push(student);
          return studentMockCreate();
        })
        .then(student => {
          studentArrayToTest.push(student);
          return studentMockCreate();
        })
        .then(student => {
          studentArrayToTest.push(student);
          return superagent.get(`${apiURL}`)
            .then(response => {
              expect(response.status).toEqual(200);

              expect(response.body[0].name).toEqual(studentArrayToTest[0].name);
              expect(response.body[0].age).toEqual(studentArrayToTest[0].age);
              expect(response.body[0].description).toEqual(studentArrayToTest[0].description);
              expect(response.body[0]._id).toEqual(studentArrayToTest[0]._id.toString());

              expect(response.body[1].name).toEqual(studentArrayToTest[1].name);
              expect(response.body[1].age).toEqual(studentArrayToTest[1].age);
              expect(response.body[1].description).toEqual(studentArrayToTest[1].description);
              expect(response.body[1]._id).toEqual(studentArrayToTest[1]._id.toString());

              expect(response.body[2].name).toEqual(studentArrayToTest[2].name);
              expect(response.body[2].age).toEqual(studentArrayToTest[2].age);
              expect(response.body[2].description).toEqual(studentArrayToTest[2].description);
              expect(response.body[2]._id).toEqual(studentArrayToTest[2]._id.toString());
            });
        });
    });

    test('should respond with a 404 if invalid route is provided', () => {
      return superagent.get(`http://localhost:${process.env.PORT}/invalid/route`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('should respond with 404 status code if the id is incorrect', () => {
      return superagent.get(`${apiURL}/invalidId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/students/:id', () => {
    test('should delete a single student if valid id is provided', () => {
      return studentMockCreate()
        .then(student => {
          return superagent.delete(`${apiURL}/${student._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should respond with 404 status code if id does not exist', () => {
      return superagent.delete(`${apiURL}/nonexistentId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/students/', () => {
    test('should respond with 400 status code if no id is provided', () => {
      return superagent.delete(`${apiURL}`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
  });
});