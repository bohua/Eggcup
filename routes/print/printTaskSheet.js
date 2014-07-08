/**
 * Created by Bohua on 2014-07-06.
 */

var print_bo = require(__dirname + '/../../server/print/print_bo');

module.exports = function (req, res) {

	print_bo.print().then(
		function (success) {
			if(success){
				res.statusCode = 200;
				res.contentType('json');
				res.json(success);
			}else{
				res.statusCode = 200;
				res.contentType('json');
				res.json({
					code: 'ERR_PRINT_ERROR',
					reason: '打印失败'
				});
			}
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_PRINT_ERROR',
				reason: '打印失败时数据出错'
			});
		}
	);
};