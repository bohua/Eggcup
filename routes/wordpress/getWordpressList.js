/**
 * Created by Bli on 2014/4/28.
 */

var bo = require(__dirname + '/../../../server/wordpress/wordpress_bo');

module.exports = function (req, res) {

	bo.getAll().then(
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