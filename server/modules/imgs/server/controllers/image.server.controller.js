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

exports.createServer = function(req, res) {
  console.log("created!!!!");
  // Store image.
  FroalaEditor.Image.upload(req, 'public/images/', function(err, data) {
    // Return data.
    if (err) {
      console.log("get error",err);
      return res.send(JSON.stringify(err));
    }

    data.link = 'http://127.0.0.1:3000/' + data.link.slice(6); //delete '/public' in the beginning of the string
    console.log("data", data);
    res.send(data);
  });
  /*  var image = new Image;
    console.log("image created");

    image.user = req.user;
    image.data = fs.readFileSync(p);
    image.contentType = 'image/png/jpge/jpg'

    image.save(function(err) {
      if (err) {
        console.log("fail", err);
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        console.log("success");
        res.json(image);
      }
    });*/
};
exports.create = function(req, res) {
  console.log("created!!!!");
  // Store image.
    var image = new Image(req.body);
    image.contentType='image/*';
    console.log("image created");
    image.user = req.user;

    image.save(function(err) {
      if (err) {
        console.log("fail", err);
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        console.log("success");
        res.json(image);
      }
    });
};
/**
 * Show the current image
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var image = req.image ? req.image : {};


  // Add a custom field to the image, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the image model.
  image.isCurrentUserOwner = !!(req.user && image.user && image.user._id.toString() === req.user._id.toString());
  res.contentType(image.contentType);
  res.sent(image);

};


/**
 * Delete an image
 */
exports.delete = function(req, res) {
  var image = req.image;

  image.remove(function(err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(image);
    }
  });
};

/**
 * List of images
 */
exports.listServer = function(req, res) {

  /*Image.find().sort('-created').populate('user', 'displayName').exec(function(err, images) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(images);
    }
  });
};


exports.imageByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'image is invalid'
    });
  }


  Image.findById(id).populate('user', 'displayName').exec(function(err, image) {
    if (err) {
      return next(err);
    } else if (!image) {
      return res.status(404).send({
        message: 'No image with that identifier has been found'
      });
    }
    req.image = image;
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
exports.list = function(req, res) {

  /*Image.find().sort('-created').populate('user', 'displayName').exec(function(err, images) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(images);
    }
  });
};


exports.imageByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'image is invalid'
    });
  }

  Image.findById(id).populate('user', 'displayName').exec(function(err, image) {
    if (err) {
      return next(err);
    } else if (!image) {
      return res.status(404).send({
        message: 'No image with that identifier has been found'
      });
    }
    req.image = image;
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
exports.imageByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'image is invalid'
    });
  }

  Image.findById(id).populate('user', 'displayName').exec(function(err, image) {
    if (err) {
      return next(err);
    } else if (!image) {
      return res.status(404).send({
        message: 'No image with that identifier has been found'
      });
    }
    req.image = image;
    next();
  });
};
