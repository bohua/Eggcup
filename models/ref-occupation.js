/**
 * Created by Bli on 2014/4/3.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var REF_OCCUPATION = sequelize.define('REF_OCCUPATION', {
		zw:			{ type: Sequelize.STRING }
	});

	return REF_OCCUPATION;
};