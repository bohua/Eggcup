/**
 * Created by Bli on 2014/4/28.
 */
module.exports = function (req, res) {
	global.db.REF_CUSTOMER.findAll({
		where: {
			enable: true
		}
	}).success(function (customers) {
		res.contentType('json');
		res.json(customers);
	});
};