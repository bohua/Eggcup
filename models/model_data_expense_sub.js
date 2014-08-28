/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_EXPENSE_SUB = sequelize.define('DATA_EXPENSE_SUB', {
		/**
		 * Expense Sub-item Properties
		 */
		expense_date:		{ type: DataTypes.DATE },
		expense_expense:	{ type: DataTypes.DECIMAL(16,2), defaultValue: 0.00 },
		expense_method:		{ type: DataTypes.STRING },
		expense_desc:		{ type: DataTypes.STRING }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_EXPENSE_SUB
					.belongsTo(models.DATA_EXPENSE, {as: 'parent', foreignKey: 'expense_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'attachment', foreignKey: 'expense_sub_id'})
			}
		}
	});

	return DATA_EXPENSE_SUB;
};