/**
 * Created by Bli on 2014/4/3.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var REF_DEPARTMENT = sequelize.define('REF_DEPARTMENT', {
		bm:			{ type: Sequelize.STRING }
	});

	return REF_DEPARTMENT;
};