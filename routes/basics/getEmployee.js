/**
 * Created by Bli on 2014/4/28.
 */
module.exports = function (req, res) {
	var id = req.params.customer_id;

	global.db.REF_EMPLOYEE.find({
		where: {
			id: id,
			enable: true
		}
	}).success(function (employee) {
		res.contentType('json');
		res.json(employee);
	});
};