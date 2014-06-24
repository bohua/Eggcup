/**
 * Created by Bli on 2014/5/5.
 */
var Q = require("q");
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
						},function(failure){
							global.logger.error(failure);
						});
				}

				//Save reply sheet
				if (model.replySheet) {
					reply_sheet_bo.save(model.replySheet)
						.then(function (reply_sheet_instance) {
							task_instance.setReplySheet(reply_sheet_instance);
						},function(failure){
							global.logger.error(failure);
						});
				}

				//Save proposal sheet
				if (model.proposalSheet) {
					proposal_sheet_bo.save(model.proposalSheet)
						.then(function (proposal_sheet_instance) {
						task_instance.setProposalSheet(proposal_sheet_instance);
						},function(failure){
						global.logger.error(failure);
					});
				}

				//Save contract sheet
				if (model.contractSheet) {
					contract_sheet_bo.save(model.contractSheet)
						.then(function (contract_sheet_instance) {
							task_instance.setContractSheet(contract_sheet_instance);
						},function(failure){
							global.logger.error(failure);
						});
				}

				//Save execute sheet
				if (model.executeSheet) {
					execute_sheet_bo.save(model.executeSheet)
						.then(function (execute_sheet_instance) {
							task_instance.setExecuteSheet(execute_sheet_instance);
						},function(failure){
							global.logger.error(failure);
						});
				}

				//Save account sheet
				if (model.accountSheet) {
					account_sheet_bo.save(model.accountSheet)
						.then(function (account_sheet_instance) {
							task_instance.setAccountSheet(account_sheet_instance);
						},function(failure){
							global.logger.error(failure);
						});
				}

				//Save summary sheet
				if (model.summarySheet) {
					summary_sheet_bo.save(model.summarySheet)
						.then(function (summary_sheet_instance) {
							task_instance.setSummarySheet(summary_sheet_instance);
						},function(failure){
							global.logger.error(failure);
						});
				}

				//Save expense sheet
				if (model.expenseSheet) {
					expense_sheet_bo.save(model.expenseSheet)
						.then(function (expense_sheet_instance) {
							task_instance.setExpenseSheet(expense_sheet_instance);
						},function(failure){
							global.logger.error(failure);
						});
				}

				//Save appointment sheet
				if (model.appointmentSheet) {
					appointment_sheet_bo.save(model.appointmentSheet)
						.then(function (appointment_sheet_instance) {
							task_instance.setAppointmentSheet(appointment_sheet_instance);
						},function(failure){
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
});

module.exports = TASK;