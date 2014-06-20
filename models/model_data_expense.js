/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_EXPENSE = sequelize.define('DATA_EXPENSE', {
		/**
		 * Account Properties
		 */

		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_EXPENSE
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.DATA_EXPENSE_SUB, {as: 'subItem', foreignKey: 'expense_id'})
			}
		}
	});

	return DATA_EXPENSE;
};