/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_TA_BJ = sequelize.define('DATA_TA_BJ', {
		dm:				{ type: DataTypes.STRING, allowNull: false },
		je:				{ type: DataTypes.DECIMAL(16,2) },
		zk:				{ type: DataTypes.DECIMAL(16,2) },
		shuije:			{ type: DataTypes.DECIMAL(16,2) },
		sumje:			{ type: DataTypes.DECIMAL(16,2) },
		bjdate:			{ type: DataTypes.DATE },
		bjr:			{ type: DataTypes.STRING },
		bz:				{ type: DataTypes.STRING },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_TA_BJ
					.hasMany(models.DATA_FILE)
					.hasMany(models.DATA_TA_BJ_DETAIL);
			}
		}
	});

	return DATA_TA_BJ;
};