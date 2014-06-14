/**
 * Created by Bli on 2014/4/28.
 */

var employee_bo = require(__dirname + '/../../../server/basics/employee_bo');

module.exports = function (req, res) {

	employee_bo.get({
		id: req.params.employee_id,
		enable: true
	}).then(
		function (success) {
			res.statusCode = 200;
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_EMPLOYEE_FAILURE',
				reason: '检索员工信息时数据库出错'
			});
		}
	);
};