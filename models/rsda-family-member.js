/**
 * Created by Bli on 2014/4/3.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var RSDA_FAMILY_MEMBER = sequelize.define('RSDA_FAMILY_MEMBER', {
		jtcyxm:		{ type: Sequelize.STRING },
		ybrgx:		{ type: Sequelize.STRING },
		csrq:		{ type: Sequelize.DATE },
		gzdw:		{ type: Sequelize.STRING },
		drzw:		{ type: Sequelize.STRING },
		zzmm:		{ type: Sequelize.STRING },
		lxdh:		{ type: Sequelize.STRING }
	});

	return RSDA_FAMILY_MEMBER;
};