var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressHbs=require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');

var index = require('./routes/index');
var order = require('./routes/order_creation');

var myUri='mongodb://localhost:27017/order';
var config = require('./config/config');
var app = express();

var en = process.env.NODE_ENV;
var uri = config.db[en];

mongoose.connect(uri, {
  useMongoClient: true,

});
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs',expressHbs({defaultLayout: 'layouts', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/order', order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;
