/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_EXECUTE = sequelize.define('DATA_EXECUTE', {
		/**
		 * Execute Properties
		 */
		project_manager:	{ type: DataTypes.STRING },
		project_runner:		{ type: DataTypes.STRING },
		project_topic:		{ type: DataTypes.STRING },

		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_EXECUTE
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.DATA_EXECUTE_SUB, {as: 'subItem', foreignKey: 'execute_id'})
			}
		}
	});

	return DATA_EXECUTE;
};