/**
 * Created by Bli on 2014/4/2.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var RSDA_FIRST_BIRTH_CHILDREN = sequelize.define('RSDA_FIRST_BIRTH_CHILDREN', {
		znxm:			{ type: Sequelize.STRING },
		znxb:			{ type: Sequelize.STRING },
		scfs:			{ type: Sequelize.STRING },
		sc_date:		{ type: Sequelize.DATE }
	});

	return RSDA_FIRST_BIRTH_CHILDREN;
};