/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_HT_DETAIL = sequelize.define('DATA_HT_DETAIL', {
		xh:				{ type: DataTypes.INTEGER },
		fkje:			{ type: DataTypes.DECIMAL(16,2) },
		fkdate:			{ type: DataTypes.DATE },
		fkfs:			{ type: DataTypes.STRING },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_HT_DETAIL
					.hasOne(models.DATA_FILE);
			}
		}
	});

	return DATA_HT_DETAIL;
};