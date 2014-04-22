/**
 * Created by Bli on 2014/4/2.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var RSDA_FIRST_BIRTH = sequelize.define('RSDA_FIRST_BIRTH', {
		zszhao:			{ type: Sequelize.STRING },
		dsznzhao:		{ type: Sequelize.STRING },
		zns:			{ type: Sequelize.INTEGER },
		brsycs:			{ type: Sequelize.INTEGER },
		posycs:			{ type: Sequelize.INTEGER },
		jycs:			{ type: Sequelize.STRING },
		lscs_date:		{ type: Sequelize.DATE }
	},{
		classMethods: {
			associate: function (models) {
				RSDA_FIRST_BIRTH.hasMany(models.RSDA_FIRST_BIRTH_CHILDREN);
			}
		}
	});

	return RSDA_FIRST_BIRTH;
};