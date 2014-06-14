/**
 * Created by Bohua on 2014-04-22.
 */

module.exports = function (sequelize, DataTypes) {

	var REF_FY = sequelize.define('REF_FY', {
		mc:			    { type: DataTypes.STRING },
		bz:				{ type: DataTypes.STRING }
	});

	return REF_FY;
};