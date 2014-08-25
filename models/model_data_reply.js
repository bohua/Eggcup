/**
 * Created by bli on 2014/5/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_REPLY = sequelize.define('DATA_REPLY', {
		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }

	}, {
		classMethods: {
			associate: function (models) {
				DATA_REPLY
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.DATA_REPLY_SUB, {as: 'subItem', foreignKey: 'reply_id'})
			}
		}
	});

	return DATA_REPLY;
};