/**
 * Created by Bli on 2014/4/1.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_ZXDJ = sequelize.define('DATA_ZXDJ', {
		dm:				{ type: DataTypes.STRING, allowNull: false },
		zxfs1:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		zxfs2:			{ type: DataTypes.BOOLEAN, defaultValue: false},
		zxfs3:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		zxfs4:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		zxzt:			{ type: DataTypes.STRING },
		zxsx:			{ type: DataTypes.TEXT },
		ydqx1:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		ydqx2:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		djr:			{ type: DataTypes.STRING },
		djdate:			{ type: DataTypes.DATE },
		psdate:			{ type: DataTypes.DATE },
		clr:			{ type: DataTypes.STRING },
		clfs:			{ type: DataTypes.STRING },
		bz:				{ type: DataTypes.STRING },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false },
		shbz:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_ZXDJ
					.hasMany(models.DATA_FILE)
					.hasOne(models.DATA_ZXSH)
					.hasMany(models.DATA_TA)
					.hasMany(models.DATA_HT)
					.belongsTo(models.REF_KH);
			}
		}
	});

	return DATA_ZXDJ;
};