/**
 * Created by Bli on 2014/4/29.
 */
var bo = require(__dirname + '/../../../server/basics/employee_bo');

module.exports = function (req, res) {
	var id = req.body.id;
	var model = req.body;
	if (model.tags) {
		var tagIdArray = [];
		for (var i in model.tags) {
			tagIdArray.push('%' + model.tags[i].id + '%');
		}
		if (tagIdArray.length > 0) {
			model.tags = tagIdArray.join(',');
		}
	}

	if (!id) {
		bo.add(model).then(
			function (success) {
				res.statusCode = 200;
				res.json(success);
			},
			function (failure) {
				res.statusCode = 400;
				res.json({
					code: 'ERR_DB_CREATE_EMPLOYEE_FAILURE',
					reason: '生成新员工信息时数据库出错'
				});
			}
		);
	} else {
		bo.update(model).then(
			function (success) {
				res.statusCode = 200;
				res.json(success);
			},
			function (failure) {
				res.statusCode = 400;
				res.json({
					code: 'ERR_DB_SAVE_EMPLOYEE_FAILURE',
					reason: '更新员工信息时数据库出错'
				});
			}
		);
	}

}