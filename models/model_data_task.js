/**
 * Created by Bli on 2014/4/28.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_TASK = sequelize.define('DATA_TASK', {

		status:					{ type: DataTypes.INTEGER, defaultValue: 100 },
		report_date:			{ type: DataTypes.DATE },
		reporter:				{ type: DataTypes.STRING },
		assignee:				{ type: DataTypes.STRING },
		slogan:					{ type: DataTypes.STRING, defaultValue: '暂无主题' },
		tags:					{ type: DataTypes.STRING },
		handling:				{ type: DataTypes.INTEGER },
		aborted:				{ type: DataTypes.BOOLEAN, defaultValue: false },

		/**
		 * Abort Properties
		 */
		aborted:				{ type: DataTypes.BOOLEAN, defaultValue: false },
		abort_date:				{ type: DataTypes.DATE },
		abort_person:			{ type: DataTypes.STRING },
		abort_reason:			{ type: DataTypes.STRING },

		/**
		 * Register Properties
		 */
		register_topic:			{ type: DataTypes.STRING },
		register_content:		{ type: DataTypes.TEXT },

		/**
		 * Customer Properties
		 */
		customer_name:			{ type: DataTypes.STRING },
		customer_contact:		{ type: DataTypes.STRING },
		customer_tel	:		{ type: DataTypes.STRING },
		customer_address:		{ type: DataTypes.STRING },
		customer_email:			{ type: DataTypes.STRING },

		/**
		 * Other Properties
		 */
		prop_isEmail:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isTel:				{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isF2F:				{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isFax:				{ type: DataTypes.BOOLEAN, defaultValue: false },

		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_TASK
					//Sheets
					.hasOne(models.DATA_REPLY, {as:'replySheet', foreignKey: 'task_id'})
					.hasOne(models.DATA_ARRANGE, {as:'arrangeSheet', foreignKey: 'task_id'})
					.hasOne(models.DATA_PROPOSAL, {as:'proposalSheet', foreignKey: 'task_id'})
					.hasOne(models.DATA_CONTRACT, {as:'contractSheet', foreignKey: 'task_id'})
					.hasOne(models.DATA_EXECUTE, {as:'executeSheet', foreignKey: 'task_id'})
					.hasOne(models.DATA_ACCOUNT, {as:'accountSheet', foreignKey: 'task_id'})
					.hasOne(models.DATA_SUMMARY, {as:'summarySheet', foreignKey: 'task_id'})
					.hasOne(models.DATA_EXPENSE, {as:'expenseSheet', foreignKey: 'task_id'})
					.hasOne(models.DATA_APPOINTMENT, {as:'appointmentSheet', foreignKey: 'task_id'})
					.hasOne(models.DATA_REMINDER, {as:'reminderSheet', foreignKey: 'task_id'})
			}
		}
	});

	return DATA_TASK;
};
