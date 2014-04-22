/**
 * Created by Bohua on 2014-04-22.
 */

module.exports = function (sequelize, DataTypes) {

	var REF_YWY = sequelize.define('REF_YWY', {
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
	});

	return REF_YWY;
};