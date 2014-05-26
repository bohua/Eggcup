/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_PRICE = sequelize.define('DATA_PRICE', {
		/**
		 * Price Properties
		 */
		price_date:			{ type: DataTypes.DATE},
		price_discount: 		{ type: DataTypes.DECIMAL(10,2) }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_PRICE
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.DATA_PRICE_SUB, {as: 'subItems', foreignKey: 'price_id'})
			}
		}
	});

	return DATA_PRICE;
};