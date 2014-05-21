/**
 * Created by Bli on 2014/5/19.
 */
module.exports = function (sequelize, DataTypes) {

	var JOIN_EMPLOYEELIST = sequelize.define('JOIN_EMPLOYEELIST', {
		employeeId :	{ type: DataTypes.INTEGER },
		major:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	});

	return JOIN_EMPLOYEELIST;
};