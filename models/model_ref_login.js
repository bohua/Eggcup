/**
 * Created by Bohua on 2014-06-14.
 */
module.exports = function (sequelize, DataTypes) {

	var REF_LOGIN = sequelize.define('REF_LOGIN', {
		//登录信息
		username:		{ type: DataTypes.STRING },
		password:		{ type: DataTypes.STRING },
		level:			{ type: DataTypes.STRING },

		//激活使用
		enable:			{ type: DataTypes.BOOLEAN, defaultValue: true }
	}, {
		classMethods: {
			associate: function (models) {
				REF_LOGIN
					.belongsTo(models.REF_EMPLOYEE, {as: 'employee', foreignKey: 'employee_id'})
			}
		}
	});

	return REF_LOGIN;
};

