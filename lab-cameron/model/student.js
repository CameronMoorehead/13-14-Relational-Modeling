'use strict';

const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: false,
    minlength: 10,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
});

module.exports = mongoose.model('student', studentSchema);
