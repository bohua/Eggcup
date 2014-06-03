/**
 * Created by bli on 2014/5/23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_SUMMARY = sequelize.define('DATA_SUMMARY', {
		/**
		 * Summary Properties
		 */
		summary_date:			{ type: DataTypes.DATE },
		summary_person:			{ type: DataTypes.STRING },
		summary_content:		{ type: DataTypes.TEXT },

		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_SUMMARY
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
			}
		}
	});

	return DATA_SUMMARY;
};