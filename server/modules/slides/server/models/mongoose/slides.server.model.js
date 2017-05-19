'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Images = require('../../../../imgs/server/models/mongoose/image.server.model').ImageSchema;

/**
 * Slides Schema
 */
var SlidesSchema = new Schema({
  slidesSetting: {
    type: {
      title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
      },
      public: {
        type: Boolean,
        default: false,
        trim: true
      },
      description: {
        type: String,
        defalut: '',
        trim: true
      },
      tags: {
        type: [String],
        defalut: '',
        trim: true
      },
      bannerPath: {
        type: String,
        defalut: '',
        trim: true
      },
      author: {
        type: String,
        default: '',
        trim: true
      },
      banner: {
        data: Buffer,
        contentType: String
      }
    }
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
      fullScreenHtml: {
        type: String,
        default: '',
        trim: true
      },
      data: {
        type: Array,
        default: {}
      },
      hasGraph: {
        type: Boolean,
        default: false,
        trim: true
      },
      hasText: {
        type: Boolean,
        default: false,
        trim: true
      }
    }],
    default: '',
    trim: true
  }
});

var autoPopulateLead = function (next) {
  this.populate('Image.thumbnail64');
  next();
};

SlidesSchema.pre('findOne', autoPopulateLead)
  .pre('find', autoPopulateLead);

mongoose.model('Slides', SlidesSchema);
