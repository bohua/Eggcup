/**
 * Created by Bli on 2014/4/29.
 */
var bo = require(__dirname + '/../../../server/basics/customer_bo');

module.exports = function (req, res) {
	var id = req.body.id;

	if (!id) {
		bo.add(req.body).then(
			function (success) {
				res.statusCode = 200;
				res.json(success);
			},
			function (failure) {
				res.statusCode = 400;
				res.json({
					code: 'ERR_DB_CREATE_CUSTOMER_FAILURE',
					reason: '生成新客户信息时数据库出错'
				});
			}
		);
	} else {
		bo.update(req.body).then(
			function (success) {
				res.statusCode = 200;
				res.json(success);
			},
			function (failure) {
				res.statusCode = 400;
				res.json({
					code: 'ERR_DB_SAVE_CUSTOMER_FAILURE',
					reason: '更新客户信息时数据库出错'
				});
			}
		);
	}

}