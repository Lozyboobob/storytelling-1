'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  User = require('mongoose').model('User');

module.exports = function (config) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromUrlQueryParameter('token'),
      ExtractJwt.fromAuthHeader()
    ]),
    secretOrKey: config.jwt.secret
  };

  passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
    User.findById({ _id: jwtPayload.user }, '-salt -password', function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (!user) {
        return done('User not found');
      }

      return done(null, user);
    });
  }));
};
