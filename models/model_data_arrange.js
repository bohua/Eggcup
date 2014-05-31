/**
 * Created by bli on 2014/5/23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_ARRANGE = sequelize.define('DATA_ARRANGE', {
		/**
		 * Arrangement Properties
		 */
		start_date:				{ type: DataTypes.DATE },
		end_date:				{ type: DataTypes.DATE },
		arrangement_comment:	{ type: DataTypes.TEXT },
		arrangement_date:		{ type: DataTypes.DATE },
		arrangement_assignee:	{ type: DataTypes.STRING },

		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_ARRANGE
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
			}
		}
	});

	return DATA_ARRANGE;
};