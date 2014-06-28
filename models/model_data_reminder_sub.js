/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_REMINDER_SUB = sequelize.define('DATA_REMINDER_SUB', {
		/**
		 * Appointment Sub-item Properties
		 */
		reminder_due_date:		{ type: DataTypes.DATE },
		reminder_service:		{ type: DataTypes.STRING },
		reminder_expense:		{ type: DataTypes.DECIMAL(16,2) },
		reminder_sent	:		{ type: DataTypes.DATE },

		/**
		 * Redundant info
		 */
		customer_name:			{ type: DataTypes.STRING },
		contract_topic:			{ type: DataTypes.STRING },
		contract_date:			{ type: DataTypes.DATE },
		contract_due_date:		{ type: DataTypes.DATE },
		sender:					{ type: DataTypes.STRING }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_REMINDER_SUB
					.belongsTo(models.DATA_REMINDER, {as: 'parent', foreignKey: 'appointment_id'})
			}
		}
	});

	return DATA_REMINDER_SUB;
};