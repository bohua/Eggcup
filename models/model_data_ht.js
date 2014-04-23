/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_HT = sequelize.define('DATA_HT', {
		dm:				{ type: DataTypes.STRING, allowNull: false },
		qdrq:			{ type: DataTypes.DATE },
		htqx:			{ type: DataTypes.STRING },
		htbd:			{ type: DataTypes.STRING },
		htnr:			{ type: DataTypes.TEXT },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_HT
					.hasMany(models.DATA_FILE)
					.hasMany(models.DATA_HT_DETAIL)
					.hasOne(models.DATA_HT_RZ);
			}
		}
	});

	return DATA_HT;
};