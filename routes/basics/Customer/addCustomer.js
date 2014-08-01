/**
 * Created by Bohua on 2014-04-29.
 */
var bo = require(__dirname + '/../../../server/basics/customer_bo');

module.exports = function (req, res) {

	bo.save(req.body).then(
		function (success) {
			res.statusCode = 200;
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_CREATE_CUSTOMER_FAILURE',
				reason: '生成新客户信息时数据库出错',
				failureInfo: failure
			});
		});
}

