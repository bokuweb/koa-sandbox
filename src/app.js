'use strict';

const koa = require('koa');
const app = module.exports = koa();
const configureRoutes = require('./routes/');

configureRoutes(app);

if (!module.parent) app.listen(process.env.PORT || 3000);
