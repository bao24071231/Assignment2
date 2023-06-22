var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gameRouter = require('./routes/game');
var boardgameRouter = require('./routes/boardgame');
var puzzleRouter = require('./routes/puzzle');

var app = express();

var bodyParser = require('body-parser')
var mongoose = require('mongoose')
app.use(bodyParser.urlencoded({extended: false}))
var url = "mongodb+srv://quocbaohoang2003:FtYU7vqF6jEYdNJ5@assignment2cluster.dcz2w0m.mongodb.net/?retryWrites=true&w=majority/Assignment2"
//var local = "mongodb://127.0.0.1:27017/Test"

mongoose.connect(url)
.then(()=>{ console.log('Connect succeed') })
.catch((err)=>{ console.error(err)})

var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat')); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/game', gameRouter)
app.use('/boardgame', boardgameRouter)
app.use('/puzzle', puzzleRouter)

// catch 404 and forward to error handler
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
  res.render('error');
});

var port = process.env.PORT || 3001
app.listen(port)

module.exports = app;
