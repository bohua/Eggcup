/**
 * Created by Bohua on 2014-04-22.
 */

module.exports = function (sequelize, DataTypes) {

	var REF_CUSTOMER = sequelize.define('REF_CUSTOMER', {

		//公司信息
		name:			{ type: DataTypes.STRING },
		code:			{ type: DataTypes.STRING },
		address:		{ type: DataTypes.STRING },
		tel:			{ type: DataTypes.STRING },
		fax:			{ type: DataTypes.STRING },
		contact:		{ type: DataTypes.STRING },
		email:			{ type: DataTypes.STRING },
		website:		{ type: DataTypes.STRING },
		membership:		{ type: DataTypes.STRING },
		description:	{ type: DataTypes.STRING },

		//业务员绑定
		privateFlag:	{ type: DataTypes.BOOLEAN, defaultValue: false },

		//激活使用
		enable:			{ type: DataTypes.BOOLEAN, defaultValue: true }
	}, {
		classMethods: {
			associate: function (models) {
				REF_CUSTOMER
					.belongsTo(models.REF_EMPLOYEE, {as: 'represent', foreignKey: 'employee_id'})
			}
		}
	});
	return REF_CUSTOMER;
};