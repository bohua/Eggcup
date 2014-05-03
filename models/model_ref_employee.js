/**
 * Created by Bohua on 2014-04-22.
 */
var tagTran

module.exports = function (sequelize, DataTypes) {

	var REF_EMPLOYEE = sequelize.define('REF_EMPLOYEE', {
		//账户信息
		login:			{ type: DataTypes.STRING },
		password:		{ type: DataTypes.STRING },
		name:			{ type: DataTypes.STRING },
		code:			{ type: DataTypes.STRING },
		tel:			{ type: DataTypes.STRING },
		mobile:			{ type: DataTypes.STRING },
		role:			{ type: DataTypes.STRING },
		email:			{ type: DataTypes.STRING },
		description:	{ type: DataTypes.STRING },
		tags:			{
			type: DataTypes.STRING,
			get : function(){

			}
		},

		//激活使用
		enable:			{ type: DataTypes.BOOLEAN, defaultValue: true }
	});

	return REF_EMPLOYEE;
};