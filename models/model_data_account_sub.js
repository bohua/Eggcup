/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_ACCOUNT_SUB = sequelize.define('DATA_ACCOUNT_SUB', {
		/**
		 * Account Sub-item Properties
		 */
		account_date:		{ type: DataTypes.DATE },
		account_expense:	{ type: DataTypes.DECIMAL(16,2), defaultValue: 0.00 },
		account_method:		{ type: DataTypes.STRING },
		account_desc:		{ type: DataTypes.STRING }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_ACCOUNT_SUB
					.belongsTo(models.DATA_EXECUTE, {as: 'parent', foreignKey: 'account_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'attachment'})
			}
		}
	});

	return DATA_ACCOUNT_SUB;
};