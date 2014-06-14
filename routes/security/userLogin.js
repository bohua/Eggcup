/**
 * Created by Bli on 14-2-26.
*/
var login_bo = require(__dirname + '/../../server/basics/login_bo');

module.exports = function (req, res) {
	var username = req.body.username;
	var password = req.body.password;

	login_bo.login({
		username: username,
		password: password
	}).then(
		function (success) {
			if(success){
				res.contentType('json');
				res.json({
					success: true,
					login_pass: success
				});
			}else{
				res.contentType('json');
				res.json({
					success: false
				});
			}

		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_LOGIN_FAILURE',
				reason: '检索登录信息时数据库出错'
			});
		}
	);
};