const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

// Middlewares
const checkAdmin = require('./middlewares/checkAdmin');
const checkUser = require('./middlewares/checkUser');
const crossConfig = require('./middlewares/crossConfig');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', crossConfig);

app.use('/auth', authRouter);
app.use('/admin', checkAdmin, adminRouter);
app.use('/users', checkUser, usersRouter);

module.exports = app;
