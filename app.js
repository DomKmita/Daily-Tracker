var createError = require('http-errors'); //the module catches http errors
var express = require('express'); //includes express module
var path = require('path'); //needed for path related operations 
var cookieParser = require('cookie-parser'); //a middleware which parses cookies attached to the client request object
var logger = require('morgan'); //morgan is a Node. js and Express middleware to log HTTP requests and errors, and simplifies the process. 
var mongoose = require('mongoose'); //Mongoose is a Node. js-based Object Data Modeling (ODM) library for MongoDB. The problem that Mongoose aims to solve is allowing developers to enforce a specific schema at the application layer. Moreover, it provides other features aimed at making it easier to work with MongoDB
//defining different routes i.e., endpoints
var indexRouter = require('./routes/index'); // the logic of index router is provided in index.js
//var usersRouter = require('./routes/users'); // the logic of user router is provided in user.js
var pageRouter = require('./routes/pageRouter'); // the logic of pagerouter is provided in pagerouter

var app = express();

// view engine setup --> View engines are useful for rendering web pages. we use ejs --> embedded javascript 
app.set('views', path.join(__dirname, 'views')); //views is the folder where we have our web pages. dirname holds the directory name
app.set('view engine', 'ejs');
//mounting the included middleware function --> allows to use the middleware functions in our application
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const url = 'mongodb://localhost:27017/DailyTrackDB'; //needed for connecting the server to a localhost MongoDB at the default port and our database name is DailyTrackDB
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.use('/', indexRouter); //use the logic provided index router at the homepage i.e., localhost:3000 added /help & /about here. Didn't see a need for separate page.
app.use('/entries', pageRouter); //use the page router when there is a request at localhost:3000/entries


// catch 404 and forward to error handler --> provided by http-error
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app; //to expose app as a module
