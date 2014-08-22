/**
 * Created by bli on 2014/8/22.
 */
var bo = require(__dirname + '/../../server/wordpress/wordpress_bo');

module.exports = function (req, res) {
	var id = req.params.wordpress_id;

	bo.removeSubItem(id).then(
		function (success) {
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_DEL_WORDPRESS_LIST_FAILURE',
				reason: '删除留言信息时数据库出错'
			});
		}
	);
};