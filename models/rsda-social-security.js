/**
 * Created by Bli on 2014/4/1.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var RSDA_SOCIAL_SECURITY = sequelize.define('RSDA_SOCIAL_SECURITY', {
		cjbx:			{ type: Sequelize.BOOLEAN },
		bxjncs:			{ type: Sequelize.STRING },
		ylbx_date:		{ type: Sequelize.DATE },
		ylhao:			{ type: Sequelize.STRING },
		ylbx2_date:		{ type: Sequelize.DATE },
		ylhao2:			{ type: Sequelize.STRING },
		sybx_date:		{ type: Sequelize.DATE },
		syhao:			{ type: Sequelize.STRING },
		gsbx_date:		{ type: Sequelize.DATE },
		gshao:			{ type: Sequelize.STRING },
		gjj_date:		{ type: Sequelize.DATE },
		gjjhao:			{ type: Sequelize.STRING },
		syzybx:			{ type: Sequelize.BOOLEAN },
		syrsbx:			{ type: Sequelize.BOOLEAN },
		gbj:			{ type: Sequelize.DECIMAL(10,2) },
		zlj:			{ type: Sequelize.DECIMAL(10,2) },
		lxr_bx:			{ type: Sequelize.STRING },
		lxr_gx:			{ type: Sequelize.STRING },
		lxr_zw:			{ type: Sequelize.STRING },
		lxr_dw:			{ type: Sequelize.STRING },
		lxr_addr:		{ type: Sequelize.STRING },
		lxr_tel:		{ type: Sequelize.STRING },
		qtgz2:			{ type: Sequelize.STRING },
		qtgz3:			{ type: Sequelize.STRING },
		bankmc:			{ type: Sequelize.STRING }
	});

	return RSDA_SOCIAL_SECURITY;
};