/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_WORDPRESS = sequelize.define('DATA_WORDPRESS', {
		/**
		 * Word press Properties
		 */
		owner:				{ type: DataTypes.STRING },
		creator:			{ type: DataTypes.STRING },
		customer_name:		{ type: DataTypes.STRING },
		customer_address:	{ type: DataTypes.STRING },
		customer_tel:		{ type: DataTypes.STRING },
		customer_email:		{ type: DataTypes.STRING },
		customer_contact:	{ type: DataTypes.STRING },

		topic:				{ type: DataTypes.STRING },
		description:		{ type: DataTypes.STRING },

		status:				{ type: DataTypes.STRING },
		disabled:			{ type: DataTypes.BOOLEAN, defaultValue: false },

		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_WORDPRESS
					.hasMany(models.DATA_WORDPRESS_SUB, {as: 'subItem', foreignKey: 'wordpress_id'})
			}
		}
	});

	return DATA_WORDPRESS;
};