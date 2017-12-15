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
        })
        .catch(error => console.log(error));
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
  });
});
