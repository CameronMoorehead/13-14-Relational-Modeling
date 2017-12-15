'use strict';

require('./lib/setup');

const superagent = require('superagent');
const server = require('../lib/server');
const schoolMock = require('./lib/school-mock');

const apiUrl = `http://localhost:${process.env.PORT}/api/students`;
