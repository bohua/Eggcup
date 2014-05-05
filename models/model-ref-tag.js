/**
 * Created by Bohua on 2014-05-02.
 */

module.exports = function (sequelize, DataTypes) {

	var REF_TAG = sequelize.define('REF_TAG', {
		tag:			{ type: DataTypes.STRING },
		type:			{ type: DataTypes.STRING },
		category:		{ type: DataTypes.STRING },
		description:	{ type: DataTypes.STRING },

		//激活使用
		enable:			{ type: DataTypes.BOOLEAN, defaultValue: true }
	});

	return REF_TAG;
};