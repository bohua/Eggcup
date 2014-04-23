/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_HT_RZ_DETAIL = sequelize.define('DATA_HT_RZ_DETAIL', {
		xh:				{ type: DataTypes.INTEGER },
		zxdate:			{ type: DataTypes.DATE },
		zxr:			{ type: DataTypes.STRING },
		zxqk:			{ type: DataTypes.TEXT },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_HT_RZ_DETAIL
					.hasOne(models.DATA_FILE);
			}
		}
	});

	return DATA_HT_RZ_DETAIL;
};