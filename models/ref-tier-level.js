/**
 * Created by Bli on 2014/4/3.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var REF_TIER_LEVEL = sequelize.define('REF_TIER_LEVEL', {
		xzjb:			{ type: Sequelize.STRING }
	});

	return REF_TIER_LEVEL;
};