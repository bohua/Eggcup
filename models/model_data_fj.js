/**
 * Created by Bohua on 2014-04-22.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_FJ = sequelize.define('DATA_FJ', {
		title:			{ type: DataTypes.STRING },
		url:			{ type: DataTypes.STRING }
	});

	return DATA_FJ;
};