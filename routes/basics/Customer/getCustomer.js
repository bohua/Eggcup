/**
 * Created by Bli on 2014/4/28.
 */

var bo = require(__dirname + '/../../../server/basics/customer_bo');

module.exports = function (req, res) {
	var id = req.params.customer_id;

	bo.get(id, true).then(
		function (success) {
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_CUSTOMER_FAILURE',
				reason: '检索客户信息时数据库出错'
			});
		}
	);
};