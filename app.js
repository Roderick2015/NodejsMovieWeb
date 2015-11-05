var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path')
var session = require('express-session')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan')
var app = express();
var dbUrl = 'mongodb://localhost/nodeweb'

mongoose.connect(dbUrl)

app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.locals.moment =require('moment')
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use(session({
	secret: 'nodeweb',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	}),
	resave:false,
  saveUninitialized:true
}))

if('development' == app.get('env')) {
	app.set('showStackError', true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug', true);
}

require('./config/routes')(app)

app.use(express.static(path.join(__dirname, 'public')))
app.listen(port);




console.log('web started on port' + port);


