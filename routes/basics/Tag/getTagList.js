/**
 * Created by Bohua on 2014-05-04.
 */
var tag_bo = require(__dirname + '/../../../server/basics/tag_bo');

module.exports = function (req, res) {
	var types = req.query.type;

	tag_bo.getAllByType(types).then(
		function (success) {
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_CUSTOMER_LIST_FAILURE',
				reason: '检索客户列表信息时数据库出错'
			});
		}
	);
};