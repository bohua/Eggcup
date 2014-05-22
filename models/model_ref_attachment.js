/**
 * Created by Bli on 2014/5/19.
 */
module.exports = function (sequelize, DataTypes) {

	var REF_ATTACHMENT = sequelize.define('REF_ATTACHMENT', {
		file_name:		{ type: DataTypes.STRING },
		file_ext:		{ type: DataTypes.STRING },
		file_size:		{ type: DataTypes.BIGINT },
		url:			{ type: DataTypes.STRING }
	});

	return REF_ATTACHMENT;
};