/**
 * Created by Bli on 2014/4/3.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var REF_PEOPLE_RACE = sequelize.define('REF_PEOPLE_RACE', {
		mz:			{ type: Sequelize.STRING }
	});

	return REF_PEOPLE_RACE;
};