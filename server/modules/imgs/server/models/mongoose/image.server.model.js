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
  contentType: String
});


mongoose.model('Image', ImageSchema);
exports.ImageSchema = ImageSchema;
