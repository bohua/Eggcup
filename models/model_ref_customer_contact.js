/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var REF_CUSTOMER_CONTACT = sequelize.define('REF_CUSTOMER_CONTACT', {
		/**
		 * Expense Sub-item Properties
		 */
		contact:		{ type: DataTypes.STRING },
		tel:			{ type: DataTypes.STRING },
		email:			{ type: DataTypes.STRING }
	}, {
		classMethods: {
			associate: function (models) {
				REF_CUSTOMER_CONTACT
					.belongsTo(models.REF_CUSTOMER, {as: 'customer', foreignKey: 'customer_id'})
			}
		}
	});

	return REF_CUSTOMER_CONTACT;
};