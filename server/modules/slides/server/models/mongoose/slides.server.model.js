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
      pageLayout: {
        type: String,
        default: 'textInCenter',
        trim: true
      },
      data: {
        type: Array,
        default: {}
      }
    }],
    default: '',
    trim: true
  }
});

mongoose.model('Slides', SlidesSchema);
