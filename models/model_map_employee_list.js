/**
 * Created by Bli on 2014/5/19.
 */
module.exports = function (sequelize, DataTypes) {

	var MAP_EMPLOYEE_LIST = sequelize.define('MAP_EMPLOYEE_LIST', {
		list_id:		{ type: DataTypes.INTEGER },
		employeeId :	{ type: DataTypes.INTEGER },
		major:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	});

	return MAP_EMPLOYEE_LIST;
};