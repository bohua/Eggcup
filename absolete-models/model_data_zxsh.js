/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_ZXSH = sequelize.define('DATA_ZXSH', {
		dm:				{ type: DataTypes.STRING, allowNull: false },
		rq:				{ type: DataTypes.DATE },
		ryap:			{ type: DataTypes.STRING },
		sjap:			{ type: DataTypes.STRING },
		shyj:			{ type: DataTypes.TEXT },
		shbz:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	});

	return DATA_ZXSH;
};