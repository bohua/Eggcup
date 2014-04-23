/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_HT_RZ = sequelize.define('DATA_HT_RZ', {
		dm:				{ type: DataTypes.STRING, allowNull: false },
		xmmc:			{ type: DataTypes.STRING },
		xmfzr:			{ type: DataTypes.STRING },
		xmzxr:			{ type: DataTypes.STRING },
		djr:			{ type: DataTypes.STRING },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_HT_RZ
					.hasMany(models.DATA_HT_DETAIL);
			}
		}
	});

	return DATA_HT_RZ;
};