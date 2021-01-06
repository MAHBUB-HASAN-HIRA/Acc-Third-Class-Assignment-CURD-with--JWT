require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const db = require('./db/db');

const app = express();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const areaRouter = require('./routes/area');

//user Controller to private full area route
const userController = require('./controllers/User.controller');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/area', userController.isAuthentication, areaRouter);

module.exports = app;