'use strict';

module.exports = app => {
  app.use(function *() {
    this.body = 'Hello world';
  });
};
