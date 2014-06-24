/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_APPOINTMENT_SUB = sequelize.define('DATA_APPOINTMENT_SUB', {
		/**
		 * Appointment Sub-item Properties
		 */
		appointment_date:		{ type: DataTypes.DATE },
		appointment_address:	{ type: DataTypes.STRING },
		appointment_desc:		{ type: DataTypes.TEXT },
		appointment_sent:		{ type: DataTypes.DATE }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_APPOINTMENT_SUB
					.belongsTo(models.DATA_APPOINTMENT, {as: 'parent', foreignKey: 'appointment_id'})
			}
		}
	});

	return DATA_APPOINTMENT_SUB;
};