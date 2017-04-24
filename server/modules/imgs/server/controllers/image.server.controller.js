'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),

  fs = require('fs'),
  Image = mongoose.model('Image'),
  FroalaEditor = require(path.resolve('../node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var filesDir = path.join(path.dirname(require.main.filename), 'public/images');
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}
/**
 * Create an Image
 */

exports.create = function(req, res) {
  console.log("created!!!!");
  // Store image.
  FroalaEditor.Image.upload(req, 'public/images/', function(err, data) {
    // Return data.
    if (err) {
      console.log(err);
      return res.send(JSON.stringify(err));
    }

    data.link = 'http://127.0.0.1:3000/' + data.link.slice(6); //delete '/public' in the beginning of the string
    console.log("data", data);
    res.send(data);
  });
  /*  var img = new Image;
    console.log("img created");

    img.user = req.user;
    img.data = fs.readFileSync(p);
    img.contentType = 'image/png/jpge/jpg'

    img.save(function(err) {
      if (err) {
        console.log("fail", err);
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        console.log("success");
        res.json(img);
      }
    });*/
};

/**
 * Show the current image
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var img = req.img ? req.img.toJSON() : {};

  // Add a custom field to the img, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the img model.
  img.isCurrentUserOwner = !!(req.user && img.user && img.user._id.toString() === req.user._id.toString());

  res.json(img);

};


/**
 * Delete an image
 */
exports.delete = function(req, res) {
  var img = req.img;

  img.remove(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(img);
    }
  });
};

/**
 * List of imgs
 */
exports.list = function(req, res) {

  /*Image.find().sort('-created').populate('user', 'displayName').exec(function(err, imgs) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(imgs);
    }
  });
};


exports.imageByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'img is invalid'
    });
  }

  Image.findById(id).populate('user', 'displayName').exec(function(err, img) {
    if (err) {
      return next(err);
    } else if (!img) {
      return res.status(404).send({
        message: 'No img with that identifier has been found'
      });
    }
    req.img = img;
    next();
  });*/
  console.log("listing");

  FroalaEditor.Image.list('public/images/', function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    console.log(data)
    return res.send(data);
  });
};
