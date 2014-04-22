/**
 * Created by Bli on 2014/4/2.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var RSDA_OTHER_INFO = sequelize.define('RSDA_OTHER_INFO', {
		xuexing:		{ type: Sequelize.STRING },
		shuxiang:		{ type: Sequelize.STRING },
		xingzuo:		{ type: Sequelize.STRING },
		shengao:		{ type: Sequelize.DECIMAL(10,2) },
		jingzhong:		{ type: Sequelize.DECIMAL(10,2) },
		tizhi:			{ type: Sequelize.STRING },
		bingyi:			{ type: Sequelize.STRING }
	});

	return RSDA_OTHER_INFO;
};