/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_CONTRACT_SUB = sequelize.define('DATA_CONTRACT_SUB', {
		/**
		 * Contract Sub-item Properties
		 */
		pay_date:			{ type: DataTypes.DATE },
		expense:			{ type: DataTypes.DECIMAL(16,2), defaultValue: 0.00 },
		due_date:			{ type: DataTypes.DATE },
		pay_method:			{ type: DataTypes.STRING }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_CONTRACT_SUB
					.belongsTo(models.DATA_CONTRACT, {as: 'parent', foreignKey: 'contract_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'contractAttach'})
			}
		}
	});

	return DATA_CONTRACT_SUB;
};