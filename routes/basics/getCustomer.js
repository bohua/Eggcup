/**
 * Created by Bli on 2014/4/28.
 */
module.exports = function (req, res) {
	var id = req.params.customer_id;

	global.db.REF_CUSTOMER.find({
		where: {
			id: id,
			enable: true
		}
	}).success(function (customer) {
		res.contentType('json');
		res.json(customer);
	});
};