/**
 * Created by Bohua on 2014-04-22.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_FILE = sequelize.define('DATA_FILE', {
		title:			{ type: DataTypes.STRING },
		url:			{ type: DataTypes.STRING }
	});

	return DATA_FILE;
};