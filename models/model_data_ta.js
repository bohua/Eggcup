/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_TA = sequelize.define('DATA_TA', {
		dm:				{ type: DataTypes.STRING, allowNull: false },
		tadate:			{ type: DataTypes.DATE },
		tabd:			{ type: DataTypes.STRING },
		tanr:			{ type: DataTypes.TEXT },
		tar:			{ type: DataTypes.STRING },
		fyr:			{ type: DataTypes.STRING },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_TA
					.hasMany(models.DATA_FILE)
					.hasOne(models.DATA_TA_BJ);
			}
		}
	});

	return DATA_TA;
};