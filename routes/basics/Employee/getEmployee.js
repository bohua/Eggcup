/**
 * Created by Bli on 2014/4/28.
 */

var employee_bo = require(__dirname + '/../../../server/basics/employee_bo');
var tag_bo = require(__dirname + '/../../../server/basics/tag_bo');
var utils = require(__dirname + '/../../../server/utils');

module.exports = function (req, res) {

	employee_bo.get({
		id: req.params.employee_id,
		enable: true
	}).then(
		function (success) {
			var employee = utils.retreiveDataValues(success);
			var employeeTagString = employee.tags;

			if (employeeTagString) {
				tag_bo.translate(employeeTagString)
					.then(
					function (tags) {
						employee.tags = tags;
						res.contentType('json');
						res.json(employee);
					},
					function () {
						res.statusCode = 400;
						res.json({
							code: 'ERR_DB_GET_EMPLOYEE_FAILURE',
							reason: '检索员工信息时数据库出错'
						});
					}
				);
			} else {
				res.contentType('json');
				res.json(employee);
			}
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