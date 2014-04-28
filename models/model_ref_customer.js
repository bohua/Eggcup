/**
 * Created by Bohua on 2014-04-22.
 */

module.exports = function (sequelize, DataTypes) {

	var REF_CUSTOMER = sequelize.define('REF_CUSTOMER', {
		name:			{ type: DataTypes.STRING },
		code:			{ type: DataTypes.STRING },
		address:		{ type: DataTypes.STRING },
		presenter:		{ type: DataTypes.INTEGER },
		tel:			{ type: DataTypes.STRING },
		fax:			{ type: DataTypes.STRING },
		contact:		{ type: DataTypes.STRING },
		email:			{ type: DataTypes.STRING },
		website:		{ type: DataTypes.STRING },
		membership:		{ type: DataTypes.STRING },
		description:	{ type: DataTypes.STRING },
		enable:			{ type: DataTypes.BOOLEAN, defaultValue: true }
	});
	return REF_CUSTOMER;
};