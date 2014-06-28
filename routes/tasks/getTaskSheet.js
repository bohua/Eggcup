/**
 * Created by Bohua on 2014-06-21.
 */
var sheet_bo_map = {
	reply: require(__dirname + "/../../server/tasks/reply_sheet_bo"),
	arrange: require(__dirname + "/../../server/tasks/arrange_sheet_bo"),
	proposal: require(__dirname + "/../../server/tasks/proposal_sheet_bo"),
	contract: require(__dirname + "/../../server/tasks/contract_sheet_bo"),
	execute: require(__dirname + "/../../server/tasks/execute_sheet_bo"),
	account: require(__dirname + "/../../server/tasks/account_sheet_bo"),
	summary: require(__dirname + "/../../server/tasks/summary_sheet_bo"),
	expense: require(__dirname + "/../../server/tasks/expense_sheet_bo"),
	appointment: require(__dirname + "/../../server/tasks/appointment_sheet_bo"),
	reminder: require(__dirname + "/../../server/tasks/reminder_sheet_bo")
};

module.exports = function (req, res) {
	var sheetType = req.query.sheetType,
		sheet_bo = sheet_bo_map[sheetType];

	if(!sheet_bo){
		res.statusCode = 400;
		res.json({
			code: 'ERR_DB_GET_TASK_FAILURE',
			reason: '检索任务信息时数据库出错'
		});

		return;
	}

	sheet_bo.get({
		task_id: req.params.task_id
	}).then(
		function (success) {
			res.statusCode = 200;
			res.contentType('json');
			res.json(success);
		},
		function (failure) {
			res.statusCode = 400;
			res.json({
				code: 'ERR_DB_GET_TASK_FAILURE',
				reason: '检索任务信息时数据库出错'
			});
		}
	);
};