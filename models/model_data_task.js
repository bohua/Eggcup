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
		handling:				{ type: DataTypes.INTEGER },

		/**
		 * Other Properties
		 */
		prop_isEmail:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isTel:				{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isF2F:				{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isFax:				{ type: DataTypes.BOOLEAN, defaultValue: false },
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
					.hasOne(models.DATA_PRICE, {as:'priceSheet', foreignKey: 'task_id'})
					.hasOne(models.DATA_CONTRACT, {as:'contractSheet', foreignKey: 'task_id'})

					//Foreign Keys
					.hasMany(models.REF_EMPLOYEE, {as: 'assignee', through: models.MAP_TASK_ASSIGNEE})
					.belongsTo(models.REF_EMPLOYEE, {as: 'reporter', foreignKey: 'reporter_id'})
					.belongsTo(models.REF_CUSTOMER, {as: 'customer', foreignKey: 'customer_id'})

					//Attachments
					.hasMany(models.REF_ATTACHMENT, {as: 'proposalAttach', foreignKey: 'proposal_attachment_id'})

			}
		}
	});

	return DATA_TASK;
};
