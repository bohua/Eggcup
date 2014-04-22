/**
 * Created by Bli on 2014/4/3.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var RSDA_SKILL = sequelize.define('RSDA_SKILL', {
		jnmc:		{ type: Sequelize.STRING },
		jnjb:		{ type: Sequelize.STRING },
		jnbz:		{ type: Sequelize.STRING }
	});

	return RSDA_SKILL;
};