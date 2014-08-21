/**
 * Created by bli on 2014/8/21.
 */
var bo = require(__dirname + '/../../server/wordpress/wordpress_bo');

module.exports = function (req, res) {
	var data = req.body.data;

	delete data.updatedAt;
	delete data.createdAt;

	bo.updateSubItem(data).then(
		function (success) {
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_WORDPRESS_LIST_FAILURE',
				reason: '检索留言信息时数据库出错'
			});
		}
	);
};