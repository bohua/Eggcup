/**
 * Created by Bli on 2014/4/3.
 */
var Sequelize = require('sequelize');

module.exports = function (sequelize) {

	var REF_ROLE_TITLE = sequelize.define('REF_ROLE_TITLE', {
		xzjb:			{ type: Sequelize.STRING }
	});

	return REF_ROLE_TITLE;
};