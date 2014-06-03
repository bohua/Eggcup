/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_ACCOUNT = sequelize.define('DATA_ACCOUNT', {
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
				DATA_ACCOUNT
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.DATA_ACCOUNT_SUB, {as: 'subItem', foreignKey: 'account_id'})
			}
		}
	});

	return DATA_ACCOUNT;
};