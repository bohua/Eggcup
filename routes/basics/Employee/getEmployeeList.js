/**
 * Created by Bli on 2014/4/28.
 */

var bo = require(__dirname + '/../../../server/basics/employee_bo');

module.exports = function (req, res) {

	bo.getAll(true).then(
		function (success) {
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_EMPLOYEE_LIST_FAILURE',
				reason: '检索员工列表信息时数据库出错'
			});
		}
	);
};