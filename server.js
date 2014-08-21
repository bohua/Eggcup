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
var wordpress = require('./routes/wordpress');
var print = require('./routes/print');
var backup = require('./routes/backup');
var attachment = require('./routes/attachment');
var winston = require('winston');
var fs = require('fs');

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
app.get('/getPermission', platform.getPermission);
app.get('/getConfigs', platform.getConfigs);

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
app.post('/employee', basics.setEmployee);
app.delete('/employee', basics.delEmployee);

/**
 * Tag Resource requests
 */
app.get('/tag', basics.getTagList);
/**
 * Task Resource requests
 */
app.get('/task', tasks.getTaskList);
app.get('/taskByAccount', tasks.getTaskListByAccount);
app.get('/taskByExpense', tasks.getTaskListByExpense);
//app.get('/taskByExpense', tasks.getTaskList);
app.get('/searchTask', tasks.searchTask);
app.get('/task/:task_id', tasks.getTask);
app.get('/statusList', tasks.getStatusList);
app.post('/task/:task_id', tasks.setTask);
app.post('/task', tasks.setTask);
app.get('/taskSheet/:task_id', tasks.getTaskSheet);
app.delete('/task/:task_id', tasks.delTask);

/**
 * Wordpress requests
 */
app.get('/wordpress/:wordpress_id', wordpress.getWordpress);
app.get('/getWordpressList', wordpress.getWordpressList);
app.post('/wordpressSubItem', wordpress.updateWordpressSubItem);
//app.delete('/wordpressSubItem', wordpress.deleteWordpressSubItem);

/**
 * File requests
 */
app.post('/file-upload', attachment.fileUpload);
app.get('/file-download/:fileUrl', attachment.fileDownload);
app.get('/getFileTypeList', platform.getFileTypeList);

/**
 * Print
 */
app.get('/printTaskSheet/:printData', print.printTaskSheet);

/**
 * Backup
 */
app.get('/backup/:file_name', backup.backup_data);
app.post('/restore', backup.restore_data);

/**
 * Initialize Logger
 */
var sys_logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)()//,
		//new (winston.transports.File)({filename: __dirname + '/logs/system.log'})
	]
});

var db_logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)()//,
		//new (winston.transports.File)({filename: __dirname + '/logs/db_log.log'})
	]
});

global.logger = sys_logger;


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
	logging: db_logger.info,
	pool: { maxConnections: 5, maxIdleTime: 30}
});

Q.allSettled(startup_check_promises)
	.then(
	function (results) {
		for (var i in results) {
			if (results[i].state === "fulfilled") {
				global.logger.info('Startup self check passed: ', results[i].value);
			} else {
				global.logger.info('Startup self check NOT passed: ', results[i].value);
			}
		}

		http.createServer(app).listen(app.get('port'), function () {
			global.logger.info('Express server listening on port ' + app.get('port'));
		});
	},
	function (failure) {
		global.logger.error('Startup canceled, due to self check failure:', failure);
	}
);
