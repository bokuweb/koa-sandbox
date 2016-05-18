'use strict';

const capture = require('../lib/capture-driver');

module.exports = function *() {
  const a = yield capture();
  console.log(a);
  this.body = 'Hello world!!!11';
};
