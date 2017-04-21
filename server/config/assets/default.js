'use strict';

/* eslint comma-dangle:[0, "only-multiline"] */

module.exports = {
  server: {
    gulpConfig: ['gulpfile.js'],
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    mongooseModels: 'modules/*/server/models/mongoose/**/*.js',
    sequelizeModels: 'modules/*/server/models/sequelize/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: ['modules/*/server/config/*.js'],
    policies: 'modules/*/server/policies/*.js',
    tests: ['modules/*/tests/server/**/*.js'],
    testIntegration: ['modules/*/test/server/**/*.js'],
    views: ['modules/*/server/views/*.html']
  }
};
