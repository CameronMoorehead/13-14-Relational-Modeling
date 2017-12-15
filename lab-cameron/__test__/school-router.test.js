'use strict';

require('./lib/setup');

const superagent = require('superagent');
const server = require('../lib/server');
const schoolMock = require('./lib/school-mock');

const apiURL = `http://localhost:${process.env.PORT}/api/schools`;

describe('/api/schools', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(schoolMock.remove);

  describe('POST /api/schools', () => {
    test('should return a 200 and a school if there are no errors', () => {
      return superagent.post(apiURL)
        .send({
          title: 'testing',
          keywords: ['test1', 'test2'],
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.keywords).toEqual(['test1', 'test2']);
        });
    });

    test('should return a 400 and a school if request is bad', () => {
      return superagent.post(apiURL)
        .send({
          keywords: ['test1', 'test2'],
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('should return a 409 due to a duplicate title clash', () => {
      return schoolMock.create()
        .then(school => {
          return superagent.post(apiURL)
            .send({
              title: school.title,
              keywords: [],
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(409);
        });
    });
  });

  describe('GET /api/schools/:id', () => {
    test('should respond with a 200 status and a category if there are no errors', () => {
      let tempSchoolMock = null;

      return schoolMock.create()
        .then(school => {
          tempSchoolMock = school;
          return superagent.get(`${apiURL}/${school._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(JSON.stringify(response.body.keywords))
            .toEqual(JSON.stringify(tempSchoolMock.keywords));
        });
    });

    test('should respond with a 404 status and a category if school id is not found', () => {
      return superagent.get(`${apiURL}/invalidId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('DELETE /api/schools/:id', () => {
    test('should respond with a 204 status and removed school if there are no errors', () => {
      return schoolMock.create()
        .then(school => {
          return superagent.delete(`${apiURL}/${school._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should respond with a 404 status and a category if school id is not found', () => {
      return superagent.delete(`${apiURL}/invalidId`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});
