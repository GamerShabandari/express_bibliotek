var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bibliotekRouter = require('./routes/bibliotek');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/biblioteket", bibliotekRouter)


// export let booksArray = [
//     { title: "Sagan om ringen", written: "1919", available: true },
//     { title: "Sagan om dig", written: "2022", available: true },
//     { title: "Sagan om mig", written: "2002", available: false }
// ]


module.exports = app;
