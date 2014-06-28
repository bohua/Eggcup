/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_REMINDER = sequelize.define('DATA_REMINDER', {
		/**
		 * Appointment Properties
		 */

		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_REMINDER
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.DATA_REMINDER_SUB, {as: 'subItem', foreignKey: 'appointment_id'})
			}
		}
	});

	return DATA_REMINDER;
};