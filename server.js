/**
 * Module dependencies.
 */
var Q = require('q');
var express = require('express');
var platform = require('./routes/platform');
var http = require('http');
var path = require('path');
var db = require('./models');
var task_status_service = require('./server/tasks/task_status_service');
var security = require('./routes/security');
var basics = require('./routes/basics');
var tasks = require('./routes/tasks');

var startup_check_promises = [];

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser({uploadDir: __dirname + '/uploads'}));
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

app.get('/', platform.loadIndex);
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
/**
 * Tag Resource requests
 */
app.get('/tag', basics.getTagList);
/**
 * Task Resource requests
 */
app.get('/task', tasks.getTaskList);
app.get('/task/:task_id', tasks.getTask);
app.get('/statusList', tasks.getStatusList);

/**
 * Upload request
 */
app.post('/file-upload', function(req, res, next) {
	console.log(req.body);
	console.log(req.files);
});


/**
 * Initialize Services
 */
startup_check_promises.push(task_status_service.init());

/**
 * Initialize DB
 */
db.setup('eggcup', 'root', 'root', {
	dialect: 'mysql',
	port: 3306,
	pool: { maxConnections: 5, maxIdleTime: 30}
});

Q.allSettled(startup_check_promises)
	.then(
	function (results) {
		for (var i in results) {
			if (results[i].state === "fulfilled") {
				console.log('Startup self check passed: ', results[i].value);
			}else{
				console.log('Startup self check NOT passed: ', results[i].value);
			}
		}

		http.createServer(app).listen(app.get('port'), function () {
			/*
			 global.db = db;
			 global.exception_handler = require( path.join(__dirname , 'server', 'exceptions', 'exception_handler.js'));
			 */
			console.log('Express server listening on port ' + app.get('port'));
		});
	},
	function (failure) {
		console.log('Startup canceled, due to self check failure:', failure);
	}
);
