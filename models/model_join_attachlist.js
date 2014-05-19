/**
 * Created by Bli on 2014/5/19.
 */
module.exports = function (sequelize, DataTypes) {

	var JOIN_ATTACHLIST = sequelize.define('JOIN_ATTACHLIST', {
		title:			{ type: DataTypes.STRING },
		url:			{ type: DataTypes.STRING }
	});

	return JOIN_ATTACHLIST;
};