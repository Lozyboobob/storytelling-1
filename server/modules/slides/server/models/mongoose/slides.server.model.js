'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Slides Schema
 */
var SlidesSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  slides: {
    type: [{
      index: {
        type: Number,
        default: '1',
        trim: true
      },
      subTitle: {
        type: String,
        default: '',
        trim: true
      },
      text: {
        type: String,
        default: '',
        trim: true
      },
      graph: {
        type: String,
        default: '',
        trim: true
      },
      data: {
        type: Array,
        default: {}
      },
      imgs: {
        type: [{
          data: Buffer,
          contentType: String
        }]
      }
    }],
    default: '',
    trim: true
  }
});

mongoose.model('Slides', SlidesSchema);
