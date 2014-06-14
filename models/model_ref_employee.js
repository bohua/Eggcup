/**
 * Created by Bohua on 2014-04-22.
 */
module.exports = function (sequelize, DataTypes) {

	var REF_EMPLOYEE = sequelize.define('REF_EMPLOYEE', {
		//账户信息
		name:			{ type: DataTypes.STRING },
		code:			{ type: DataTypes.STRING },
		tel:			{ type: DataTypes.STRING },
		mobile:			{ type: DataTypes.STRING },
		role:			{ type: DataTypes.STRING },
		email:			{ type: DataTypes.STRING },
		description:	{ type: DataTypes.STRING },
		tags:			{ type: DataTypes.STRING },

		hasLogin:		{ type: DataTypes.BOOLEAN, defaultValue: false },

		//激活使用
		enable:			{ type: DataTypes.BOOLEAN, defaultValue: true }
	}, {
		classMethods: {
			associate: function (models) {
				REF_EMPLOYEE
					.hasOne(models.REF_LOGIN, {as: 'login', foreignKey: 'employee_id'})
			}
		}
	});

	return REF_EMPLOYEE;
};