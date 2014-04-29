/**
 * Created by Bohua on 2014-04-22.
 */

module.exports = function (sequelize, DataTypes) {

	var REF_EMPLOYEE = sequelize.define('REF_EMPLOYEE', {

		//业务员信息
		name:			{ type: DataTypes.STRING },
		code:			{ type: DataTypes.STRING },
		tel:			{ type: DataTypes.STRING },
		mobile:			{ type: DataTypes.STRING },
		role:			{ type: DataTypes.STRING },
		description:	{ type: DataTypes.STRING },

		//激活使用
		enable:			{ type: DataTypes.BOOLEAN, defaultValue: true }
	});

	return REF_EMPLOYEE;
};