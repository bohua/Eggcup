/**
 * Created by Bli on 2014/5/19.
 */
module.exports = function (sequelize, DataTypes) {

	var JOIN_ASSIGNEE = sequelize.define('JOIN_ASSIGNEE', {
		employeeId : { type: DataTypes.INTEGER }
	});

	return JOIN_ASSIGNEE;
};