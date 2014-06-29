/**
 * Created by Bli on 2014/5/5.
 */
var task_bo = require(__dirname + '/../../server/tasks/task_bo');
var _ = require('lodash');
var Sequelize = require("sequelize");

function generateQuery(where) {
	var query = null;

	_.map(where, function (c) {
		if (!query) {
			query = c;
		} else {
			query = Sequelize.and(query, c);
		}
	});

	return query;

}

module.exports = function (req, res) {
	var employee_name = req.query.employee_name,
		customer_name = req.query.customer_name,
		start_date = req.query.start_date,
		end_date = req.query.end_date,
		status = req.query.status,
		where = [],
		d,
		promise;

	if (employee_name) {
		where.push(["assignee LIKE '%" + employee_name + "%'"]);
	}

	if (customer_name) {
		where.push(["customer_name LIKE '%" + customer_name + "%'"]);
	}

	if (start_date) {
		start_date = start_date.replace('"', '').split('T')[0];
		where.push({report_date: {gte: start_date}});
	}

	if (end_date) {
		end_date = end_date.replace('"', '').split('T')[0];
		where.push({report_date: {lt: end_date}});
	}

	if (status) {
		switch (status) {
			case 'closed':
			{
				where.push({status: {gte: 800}});
				break;
			}

			case 'ongoing':
			{
				where.push({status: {lt: 800}});
				break;
			}
		}

	}

	promise = task_bo.getAll(generateQuery(where));

	promise.then(
		function (success) {
			res.statusCode = 200;
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_TASK_LIST_FAILURE',
				reason: '检索任务列表信息时数据库出错'
			});
		}
	);
};