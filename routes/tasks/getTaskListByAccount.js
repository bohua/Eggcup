/**
 * Created by bli on 2014/7/7.
 */
var task_bo = require(__dirname + '/../../server/tasks/task_bo');

module.exports = function (req, res) {
	var condition = {
		employee_name: req.query.employee_name,
		customer_name: req.query.customer_name,
		start_date: req.query.start_date,
		end_date: req.query.end_date,
		status: req.query.status
	};

	task_bo.searchByAccount(condition).then(
		function (success) {
			res.statusCode = 200;
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_TASK_LIST_FAILURE',
				reason: '检索任务列表信息时数据库出错'
			});
		}
	);
};