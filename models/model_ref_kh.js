/**
 * Created by Bohua on 2014-04-22.
 */

module.exports = function (sequelize, DataTypes) {

	var REF_KH = sequelize.define('REF_KH', {
		mc:			    { type: DataTypes.STRING },
		addr:			{ type: DataTypes.STRING },
		tel:			{ type: DataTypes.STRING },
		fax:			{ type: DataTypes.STRING },
		lxr:			{ type: DataTypes.STRING },
		email:			{ type: DataTypes.STRING },
		www:			{ type: DataTypes.STRING },
		hy:				{ type: DataTypes.STRING },
		bz:				{ type: DataTypes.STRING },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				REF_KH
					.hasOne(models.REF_YWY);
			}
		}
	});

	return REF_KH;
};