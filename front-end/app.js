/**
 * Created by Rico on 9/1/16.
 */
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// ROUTES
const registerRoute = require('./server/routes/registerRoute');
const loginRoute = require('./server/routes/loginRoute');
const jobRoutes = require('./server/routes/jobRoutes');
const employerRoutes = require('./server/routes/employerRoutes');
const applicantRoutes = require('./server/routes/applicantRoutes');

//AUTHCHECK
let authCheck = require('./server/routes/authCheck');


var app = express();

var dbURL = 'localhost:27017/JobBoard';

if (process.env.NODE_ENV === 'development') {
    console.log("server is in development");
} else {
    console.log("server is in production");
    dbURL = process.env.DB_URL;
}


app.set('view engine', 'hbs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use(cookieParser());
//this was the default start up
app.use(express.static(path.join(__dirname, 'public')));

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};

app.use(allowCrossDomain);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers", "Origin", "Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Authorization");
    next();
});

app.use('/api/jobposts', jobRoutes);
app.use('/api/register', registerRoute);
app.use('/login', loginRoute);
app.use('/api/createapplicant', applicantRoutes);
app.use('/employer', authCheck, employerRoutes);

//todo need to remove this before shipping

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    console.log("in development error");
    app.use(function (err, req, res, next) {
        res.render('index');
        // res.status(err.status || 500);
        // res.json({
        //     rico: "nope shouldn't be here either",
        //     message: err.message,
        //     error: err
        // });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.log("in prod error");
    res.render('index');
    // res.status(err.status || 500);
    // res.render('error', {
    //     rico: "nope shouldn't be here",
    //     message: err.message,
    //     error: {}
    // });
});


module.exports = app;
