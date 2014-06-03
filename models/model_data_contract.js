/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_CONTRACT = sequelize.define('DATA_CONTRACT', {
		/**
		 * Contract Properties
		 */
		contract_date:		{ type: DataTypes.DATE },
		contract_due_date:	{ type: DataTypes.DATE },
		contract_topic:		{ type: DataTypes.STRING },
		contract_A:			{ type: DataTypes.STRING },
		contract_B:			{ type: DataTypes.STRING },

		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_CONTRACT
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.DATA_CONTRACT_SUB, {as: 'subItem', foreignKey: 'contract_id'})
			}
		}
	});

	return DATA_CONTRACT;
};