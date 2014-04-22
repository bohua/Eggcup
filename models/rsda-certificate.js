/**
 * Created by Bli on 2014/4/3.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var RSDA_CERTIFICATE = sequelize.define('RSDA_CERTIFICATE', {
		zzmc:		{ type: Sequelize.STRING },
		zzbh:		{ type: Sequelize.STRING },
		zzlx:		{ type: Sequelize.STRING },
		qzrq:		{ type: Sequelize.DATE },
		zzyxsj:		{ type: Sequelize.DATE },
		fzjg:		{ type: Sequelize.STRING },
		zzbz:		{ type: Sequelize.STRING }
	});

	return RSDA_CERTIFICATE;
};