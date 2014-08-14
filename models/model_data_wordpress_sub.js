/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_WORDPRESS_SUB = sequelize.define('DATA_WORDPRESS_SUB', {
		/**
		 * Word press Sub-item Properties
		 */
		owner:					{ type: DataTypes.STRING },
		content:				{ type: DataTypes.TEXT },
		is_customer_word:		{ type: DataTypes.BOOLEAN, defaultValue: false },

		importance		:		{ type: DataTypes.INTEGER, defaultValue: 0 },

		has_read:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_WORDPRESS_SUB
					.belongsTo(models.DATA_WORDPRESS, {as: 'parent', foreignKey: 'wordpress_id'})
			}
		}
	});

	return DATA_WORDPRESS_SUB;
};