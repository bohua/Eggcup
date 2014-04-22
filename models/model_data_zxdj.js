/**
 * Created by Bli on 2014/4/1.
 */
module.exports = function (DataTypes, DataTypes) {

	var DATA_ZXDJ = DataTypes.define('DATA_ZXDJ', {
		khmc:			{ type: DataTypes.STRING },
		khlxr:			{ type: DataTypes.STRING },
		khtel:			{ type: DataTypes.STRING },
		khemail:		{ type: DataTypes.STRING },
		khaddr:			{ type: DataTypes.STRING },
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
		L1:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		shbz:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_ZXDJ
					.hasMany(models.DATA_FJ)
					.belongsTo(models.REF_KH);
			}
		}
	});

	return DATA_ZXDJ;
};