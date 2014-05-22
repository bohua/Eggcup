/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_HT_SK = sequelize.define('DATA_HT_SK', {
		dm:				{ type: DataTypes.STRING, allowNull: false },
		je:				{ type: DataTypes.DECIMAL(16,2) },
		zy:				{ type: DataTypes.STRING },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	});

	return DATA_HT_SK;
};