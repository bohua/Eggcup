/**
 * Created by Bli on 2014/5/19.
 */
module.exports = function (sequelize, DataTypes) {

	var MAP_TASK_EMPLOYEE = sequelize.define('MAP_TASK_EMPLOYEE', {
		isMajor:			{ type: DataTypes.BOOLEAN, defaultValue: false }
	});

	return MAP_TASK_EMPLOYEE;
};