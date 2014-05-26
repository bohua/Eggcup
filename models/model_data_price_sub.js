/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_PRICE_SUB = sequelize.define('DATA_PRICE_SUB', {
		/**
		 * Price Sub-item Properties
		 */
		service:			{ type: DataTypes.STRING },
		date:				{ type: DataTypes.DATE },
		expense:			{ type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 },
		traffic:			{ type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 },
		extra:				{ type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 },
		sum:				{ type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_PRICE_SUB
					.belongsTo(models.DATA_PRICE, {as: 'parent', foreignKey: 'price_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'proposalAttach'})
			}
		}
	});

	return DATA_PRICE_SUB;
};