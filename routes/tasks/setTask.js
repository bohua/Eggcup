/**
 * Created by Bohua on 2014-05-05.
 */
var task_bo = require(__dirname + '/../../server/tasks/task_bo');

module.exports = function (req, res) {
	var model = req.body;

	task_bo.save(model).then(
		function (success) {
			res.statusCode = 200;
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_SET_TASK_FAILURE',
				reason: '保存任务信息时数据库出错'
			});
		}
	);
};