/**
 * Created by Bli on 2014/4/28.
 */
module.exports = function (req, res) {
	global.db.REF_EMPLOYEE.findAll({
		where: {
			enable: true
		}
	}).success(function (employees) {
		res.contentType('json');
		res.json(employees);
	});
};