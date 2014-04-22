/**
 * Created by Bli on 2014/4/3.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var RSDA_EXPERIENCE = sequelize.define('RSDA_EXPERIENCE', {
		fwjg:		{ type: Sequelize.STRING },
		drzw:		{ type: Sequelize.STRING },
		gznr:		{ type: Sequelize.STRING },
		qssj:		{ type: Sequelize.DATE },
		zzsj:		{ type: Sequelize.DATE },
		lzyy:		{ type: Sequelize.STRING },
		xinzi:		{ type: Sequelize.DECIMAL(10,2) }
	});

	return RSDA_EXPERIENCE;
};