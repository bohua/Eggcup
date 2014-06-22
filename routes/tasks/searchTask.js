/**
 * Created by Bli on 2014/5/5.
 */
var task_bo = require(__dirname + '/../../server/tasks/task_bo');
var _ = require('lodash');

module.exports = function (req, res) {
	var query = req.query.q,
		promise;

	promise = task_bo.getAll({id: parseInt(query)});

	promise.then(
		function (success) {
			var findings = [];

			_.map(success, function(finding){
				var id = finding.getDataValue('id'),
					slogan = finding.getDataValue('slogan'),
					o = {
						value: id + " - " + slogan,
						id: id
					};

				findings.push(o);
			});

			res.statusCode = 200;
			res.contentType('json');
			res.json(findings);
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