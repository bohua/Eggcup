/**
 * Created by Bli on 2014/4/28.
 */

var employee_bo = require(__dirname + '/../../../server/basics/employee_bo');
var tag_bo = require(__dirname + '/../../../server/basics/tag_bo');
var utils = require(__dirname + '/../../../server/utils');
var Q = require('q');

function findTags(employee){
	var deferred = Q.defer();
	var employeeTagString = employee.tags;

	if(employeeTagString) {
		var deferred = Q.defer();
		tag_bo.translate(employeeTagString).then(function (tags) {
			employee.tags = tags;
			deferred.resolve(employee);
		}, function () {
			deferred.reject();
		});

		return deferred.promise;
	}

	return null;
}


module.exports = function (req, res) {

	employee_bo.getAll({
		enable: true
	}).then(
		function (success) {

			res.contentType('json');
			res.json(success);
			/*
			var promises = [];

			for(var i in success){
				var promise = findTags(utils.retreiveDataValues(success[i]));

				if(promise){
					promises.push(promise);
				}
			}

			Q.allSettled(promises)
				.then(function (results) {
					var dataList = [];
					for (var i in results) {
						if (results[i].state === "fulfilled") {
							dataList.push(results[i].value);
						}
					}

					res.contentType('json');
					res.json(dataList);
				});
			*/
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_EMPLOYEE_LIST_FAILURE',
				reason: '检索员工列表信息时数据库出错'
			});
		}
	);
};