/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_YCJD = sequelize.define('DATA_YCJD', {
		dm:				{ type: DataTypes.STRING, allowNull: false },
		dfdate:			{ type: DataTypes.DATE },
		dffs1:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		dffs2:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		dffs3:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		dffs4:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		jdhf:			{ type: DataTypes.TEXT },
		flyj:			{ type: DataTypes.TEXT },
		dfr:			{ type: DataTypes.STRING },
		fyr:			{ type: DataTypes.STRING },
		L1:				{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_YCJD
					.hasMany(models.DATA_FILE)
			}
		}
	});

	return DATA_YCJD;
};