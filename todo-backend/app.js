const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const shrinkRay = require('shrink-ray-current');
const winston = require('./util/log/logger');
const tasksRouter = require('./routes/tasks');
const groupsRouter = require('./routes/groups');
const indexRouter = require('./routes/index');

const app = express();

app.use(shrinkRay());
app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tasks', tasksRouter);
app.use('/api/groups', groupsRouter);
app.use('/', indexRouter);

module.exports = app;
