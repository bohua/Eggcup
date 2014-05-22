/**
 * Created by Bli on 2014/4/28.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_TASK = sequelize.define('DATA_TASK', {
		customer:				{ type: DataTypes.INTEGER },
		report_date:			{ type: DataTypes.DATE },
		topic:					{ type: DataTypes.STRING, defaultValue: '暂无主题' },
		status:					{ type: DataTypes.INTEGER, defaultValue: 100 },
		description:			{ type: DataTypes.TEXT },
		tags:					{ type: DataTypes.STRING },

		/**
		 * Other Properties
		 */
		prop_isEmail:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isTel:				{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isF2F:				{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isFax:				{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false },

		/**
		 * Arrangement Properties
		 */
		handling:				{ type: DataTypes.INTEGER },
		start_date:				{ type: DataTypes.DATE},
		end_date:				{ type: DataTypes.DATE},
		arrangement_comment:	{type: DataTypes.TEXT},
		arrangement_date:   	{type: DataTypes.DATE},

		/**
		 * Reply Properties
		 */
		reply_withEmail:		{ type: DataTypes.BOOLEAN, defaultValue: false },
		reply_withTel:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		reply_withF2F:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		reply_withFax:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		reply_date:				{ type: DataTypes.DATE },
		consult_person:			{ type: DataTypes.STRING },
		reply_person:			{ type: DataTypes.INTEGER},
		translate_person:		{ type: DataTypes.INTEGER},

		meeting_address:		{ type: DataTypes.STRING },
		meeting_people_A:		{ type: DataTypes.STRING },
		meeting_people_B:		{ type: DataTypes.STRING },

		consult_context:		{ type: DataTypes.TEXT },
		reply_context:			{ type: DataTypes.TEXT },
		law_context:			{ type: DataTypes.TEXT }

	},{
		classMethods: {
			associate: function (models) {
				DATA_TASK
					.hasMany(models.REF_EMPLOYEE, {as: 'assignee', through: models.MAP_TASK_ASSIGNEE})
					.belongsTo(models.REF_EMPLOYEE, {as: 'reporter', foreignKey: 'reporter_id'})
					.belongsTo(models.REF_CUSTOMER, {as: 'customer', foreignKey: 'customer_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'replyAttach', foreignKey: 'reply_attachment_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'proposalAttach', foreignKey: 'proposal_attachment_id'})
			}
		}
	});

	return DATA_TASK;
};
