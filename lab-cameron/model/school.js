'use strict';

const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  keywords: [{ type: String }],
  timeStamp: {
    type: Date,
    default: () => new Date(),
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student'}],
}, {
  usePushEach: true,
});

module.exports = mongoose.model('school', schoolSchema);
