/**
 * Created by Bli on 2014/4/1.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var ZXDJ = sequelize.define('ZXDJ', {
		khmc:			{ type: Sequelize.STRING },
		khlxr:			{ type: Sequelize.STRING },
		khtel:			{ type: Sequelize.STRING },
		khemail:		{ type: Sequelize.STRING },
		khaddr:			{ type: Sequelize.STRING },
		zxfs1:			{ type: Sequelize.BOOLEAN, defaultValue: false },
		zxfs2:			{ type: Sequelize.BOOLEAN, defaultValue: false},
		zxfs3:			{ type: Sequelize.BOOLEAN, defaultValue: false },
		zxfs4:			{ type: Sequelize.BOOLEAN, defaultValue: false },
		zxzt:			{ type: Sequelize.STRING },
		zxsx:			{ type: Sequelize.TEXT },
		ydqx1:			{ type: Sequelize.BOOLEAN, defaultValue: false },
		ydqx2:			{ type: Sequelize.BOOLEAN, defaultValue: false },
		djr:			{ type: Sequelize.STRING },
		djdate:			{ type: Sequelize.DATE },
		psdate:			{ type: Sequelize.DATE },
		clr:			{ type: Sequelize.STRING },
		clfs:			{ type: Sequelize.STRING },
		bz:				{ type: Sequelize.STRING },
		shbz:			{ type: Sequelize.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				ZXDJ
					.hasMany(models.FJ)
					.belongsTo(models.KH);
			}
		}
	});

	return RSDA_MASTER;
};