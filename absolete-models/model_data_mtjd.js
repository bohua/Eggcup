/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_MTJD = sequelize.define('DATA_MTJD', {
		dm:				{ type: DataTypes.STRING, allowNull: false },
		mtaddr:			{ type: DataTypes.STRING },
		mtry1:			{ type: DataTypes.STRING },
		mtry2:			{ type: DataTypes.STRING },
		zxjd:			{ type: DataTypes.TEXT },
		flyj:			{ type: DataTypes.TEXT },
		bgr:			{ type: DataTypes.STRING },
		fyr:			{ type: DataTypes.STRING },
		mtdate:			{ type: DataTypes.DATE },
		jldate:			{ type: DataTypes.DATE },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_MTJD
					.hasMany(models.DATA_FILE)
			}
		}
	});

	return DATA_MTJD;
};