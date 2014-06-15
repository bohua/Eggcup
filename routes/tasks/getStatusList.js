/**
 * Created by bli on 2014/5/7.
 */
var task_status_service = require(__dirname + '/../../server/tasks/task_status_service');

module.exports = function (req, res) {
	res.statusCode = 200;
	res.contentType('json');
	res.json(task_status_service.getAll());
};