'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Images Schema
 */
var ImageSchema = new Schema({

  data: Buffer,
  contentType: String,

  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Image', ImageSchema);
