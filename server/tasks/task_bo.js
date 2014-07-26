/**
 * Created by Bli on 2014/5/5.
 */
var Q = require("q");
var _ = require('lodash');
var Sequelize = require("sequelize");

var Bo = require(__dirname + "/../abstract_bo");
var reply_sheet_bo = require(__dirname + "/reply_sheet_bo");
var arrange_sheet_bo = require(__dirname + "/arrange_sheet_bo");
var proposal_sheet_bo = require(__dirname + "/proposal_sheet_bo");
var contract_sheet_bo = require(__dirname + "/contract_sheet_bo");
var execute_sheet_bo = require(__dirname + "/execute_sheet_bo");
var account_sheet_bo = require(__dirname + "/account_sheet_bo");
var summary_sheet_bo = require(__dirname + "/summary_sheet_bo");
var expense_sheet_bo = require(__dirname + "/expense_sheet_bo");
var appointment_sheet_bo = require(__dirname + "/appointment_sheet_bo");
var reminder_sheet_bo = require(__dirname + "/reminder_sheet_bo");

function generateQuery(condition, extra) {
	var query = null,
		where = [],
		d;

	if (condition.employee_name) {
		where.push(["assignee LIKE '%" + condition.employee_name + "%'"]);
	}

	if (condition.customer_name) {
		where.push(["customer_name LIKE '%" + condition.customer_name + "%'"]);
	}

	if (condition.start_date) {
		condition.start_date = condition.start_date.replace('"', '').split('T')[0];
		where.push({report_date: {gte: condition.start_date + " 00:00:00"}});
	}

	if (condition.end_date) {
		condition.end_date = condition.end_date.replace('"', '').split('T')[0];
		where.push({report_date: {lte: condition.end_date + " 23:59:59"}});
	}

	if (extra) {
		where = where.concat(extra);
	}

	_.map(where, function (c) {
		if (!query) {
			query = c;
		} else {
			query = Sequelize.and(query, c);
		}
	});

	return query;
}

var TASK = new Bo('DATA_TASK', {
	name: 'save',
	method: function (model) {
		var promise = this._save(model);

		promise.then(
			function (task_instance) {

				//Save arrange sheet
				if (model.arrangeSheet) {
					arrange_sheet_bo.save(model.arrangeSheet)
						.then(function (arrange_sheet_instance) {
							task_instance.setArrangeSheet(arrange_sheet_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}

				//Save reply sheet
				if (model.replySheet) {
					reply_sheet_bo.save(model.replySheet)
						.then(function (reply_sheet_instance) {
							task_instance.setReplySheet(reply_sheet_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}

				//Save proposal sheet
				if (model.proposalSheet) {
					proposal_sheet_bo.save(model.proposalSheet)
						.then(function (proposal_sheet_instance) {
							task_instance.setProposalSheet(proposal_sheet_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}

				//Save contract sheet
				if (model.contractSheet) {
					contract_sheet_bo.save(model.contractSheet)
						.then(function (contract_sheet_instance) {
							task_instance.setContractSheet(contract_sheet_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}

				//Save execute sheet
				if (model.executeSheet) {
					execute_sheet_bo.save(model.executeSheet)
						.then(function (execute_sheet_instance) {
							task_instance.setExecuteSheet(execute_sheet_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}

				//Save account sheet
				if (model.accountSheet) {
					account_sheet_bo.save(model.accountSheet)
						.then(function (account_sheet_instance) {
							task_instance.setAccountSheet(account_sheet_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}

				//Save summary sheet
				if (model.summarySheet) {
					summary_sheet_bo.save(model.summarySheet)
						.then(function (summary_sheet_instance) {
							task_instance.setSummarySheet(summary_sheet_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}

				//Save expense sheet
				if (model.expenseSheet) {
					expense_sheet_bo.save(model.expenseSheet)
						.then(function (expense_sheet_instance) {
							task_instance.setExpenseSheet(expense_sheet_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}

				//Save appointment sheet
				if (model.appointmentSheet) {
					appointment_sheet_bo.save(model.appointmentSheet)
						.then(function (appointment_sheet_instance) {
							task_instance.setAppointmentSheet(appointment_sheet_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}

				//Save reminder sheet
				if (model.reminderSheet) {
					reminder_sheet_bo.save(model.reminderSheet)
						.then(function (reminder_sheet_instance) {
							task_instance.setReminderSheet(reminder_sheet_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}
			},
			function (failure) {
				global.logger.error(failure);
			}
		);

		return promise;
	}
}, {
	name: 'searchByTask',
	method: function (condition) {
		var extra = [];

		if (condition.status) {
			switch (condition.status) {
				case 'closed':
				{
					extra.push({status: {gte: 800}});
					break;
				}

				case 'ongoing':
				{
					extra.push({status: {lt: 800}});
					break;
				}
			}
		}

		return this.getAll(generateQuery(condition, extra));
	}
}, {
	name: 'searchByAccount',
	method: function (condition) {
		var deferred = Q.defer(),
			model = this.orm.model,
			sequelize = this.orm.Seq().sequelize,
			extra = [];

		model('DATA_ACCOUNT').findAll({
			include: [
				{
					model: model('DATA_ACCOUNT_SUB'),
					as: 'subItem',
					include: [
						{
							model: model('REF_ATTACHMENT'),
							as: 'attachment'
						}
					]
				},
				{
					model: model('DATA_TASK'),
					as: 'task',
					where: generateQuery(condition, extra),
					include: [
						{
							model: model('DATA_CONTRACT'),
							as: 'contractSheet'
						}
					]
				}
			]
		}).then(
			function (success) {
				var results = [];
				_.map(success, function (item) {
					var tmp = {};

					if (item.subItem && !_.isEmpty(item.subItem)) {
						tmp.subItem = item.subItem;

						tmp.account_total = _.pluck(item.subItem, 'account_expense').reduce(function (sum, num) {
							return sum + num;
						});
					}

					if (item.task) {
						tmp.id = item.task.id;
						tmp.report_date = item.task.report_date;
						tmp.customer_name = item.task.customer_name;
						tmp.assignee = item.task.assignee;
						tmp.slogan = item.task.slogan;

						if (item.task.contractSheet) {
							tmp.contract_price = item.task.contractSheet.contract_price;
							tmp.account_topay = item.task.contractSheet.contract_price - (tmp.account_total || 0);
						}
					}

					if (!tmp.account_total) {
						tmp.account_total = 0;
					}

					if (!tmp.contract_price) {
						tmp.contract_price = 0;
					}

					if (tmp.account_total === 0 && tmp.contract_price === 0) {
						return;
					}

					if (condition.status) {
						switch (condition.status) {
							case 'clear':
							{
								if (!_.isUndefined(tmp.account_topay) && tmp.account_topay === 0) {
									results.push(tmp);
								}
								break;
							}

							case 'unclear':
							{
								if (!_.isUndefined(tmp.account_topay) && tmp.account_topay !== 0) {
									results.push(tmp);
								}
								break;
							}

							default :
							{
								results.push(tmp);
								break;
							}
						}
					}
				});
				deferred.resolve(results);
			},
			function (failure) {
				global.logger.error(failure);
				deferred.reject(failure);
			});

		return deferred.promise;
	}
}, {
	name: 'searchByExpense',
	method: function (condition) {
		var deferred = Q.defer(),
			model = this.orm.model,
			sequelize = this.orm.Seq().sequelize,
			extra = [];

		model('DATA_EXPENSE').findAll({
			include: [
				{
					model: model('DATA_EXPENSE_SUB'),
					as: 'subItem',
					include: [
						{
							model: model('REF_ATTACHMENT'),
							as: 'attachment'
						}
					]
				},
				{
					model: model('DATA_TASK'),
					as: 'task',
					where: generateQuery(condition, extra),
					include: [
						{
							model: model('DATA_CONTRACT'),
							as: 'contractSheet'
						}
					]
				}
			]
		}).then(
			function (success) {
				var results = [];
				_.map(success, function (item) {
					var tmp = {};
					if (item.subItem && !_.isEmpty(item.subItem)) {
						tmp.subItem = item.subItem;

						tmp.expense_total = _.pluck(item.subItem, 'expense_expense').reduce(function (sum, num) {
							return sum + num;
						});
					}

					if (item.task) {
						tmp.id = item.task.id;
						tmp.report_date = item.task.report_date;
						tmp.customer_name = item.task.customer_name;
						tmp.assignee = item.task.assignee;
						tmp.slogan = item.task.slogan;

						if (item.task.contractSheet) {
							tmp.contract_price = item.task.contractSheet.contract_price;
						}
					}

					if (!tmp.expense_total || tmp.expense_total <= 0) {
						return;
					}

					results.push(tmp);
				});
				deferred.resolve(results);
			},
			function (failure) {
				global.logger.error(failure);
				deferred.reject(failure);
			});

		return deferred.promise;
	}
});

module.exports = TASK;