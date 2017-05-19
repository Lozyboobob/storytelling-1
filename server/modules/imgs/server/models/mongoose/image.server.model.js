'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Images Schema
 */
var ImagesSchema = new Schema({
  data: Buffer,
  path: String
});


mongoose.model('Image', ImagesSchema);
exports.ImagesSchema = ImagesSchema;
