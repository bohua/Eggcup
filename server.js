
/**
 * Module dependencies.
 */

var express = require('express');
var platform = require('./routes/platform');
var http = require('http');
var path = require('path');
var db = require('./models');
var security = require('./routes/security');
var basics = require('./routes/basics');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');
app.use(express.favicon( path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
//app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', platform.loadJsScript);
app.get('/getLeftMenu', platform.getLeftMenu);
app.get('/getLocationArray', platform.getLocationArray);
app.post('/login', security.userLogin);

/**
 * Customer Resource requests
 */
app.get('/customer', basics.getCustomerList);
app.get('/customer/:customer_id', basics.getCustomer);
app.post('/customer/:customer_id', basics.setCustomer);
app.post('/customer', basics.addCustomer);
app.delete('/customer', basics.delCustomer);
/**
 * Employee Resource requests
 */
app.get('/employee', basics.getEmployeeList);
app.get('/employee/:employee_id', basics.getEmployee);
app.post('/employee/:employee_id', basics.setEmployee);

db
	.sequelize
	.authenticate()
	.complete(function(err) {
		if (err) {
			throw err;
		} else {
			http.createServer(app).listen(app.get('port'), function(){
				global.db = db;
				global.exception_handler = require( path.join(__dirname , 'server', 'exceptions', 'exception_handler.js'));

				console.log('Express server listening on port ' + app.get('port'));
			})
		}
	});