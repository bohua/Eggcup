/**
 * Created by Bli on 2014/4/30.
 */
var task_bo = require(__dirname + '/../../server/tasks/task_bo');

module.exports = function (req, res) {

	task_bo.get({
		id: req.params.task_id
	}).then(
		function (success) {
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_TASK_FAILURE',
				reason: '检索任务信息时数据库出错'
			});
		}
	);
};