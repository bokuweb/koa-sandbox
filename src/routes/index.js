'use strict';

const _ = require('koa-route');
const capture = require('../model/capture');

module.exports = app => {
  app.use(_.get('/capture', capture));
};
