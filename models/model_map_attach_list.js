/**
 * Created by Bli on 2014/5/19.
 */
module.exports = function (sequelize, DataTypes) {

	var MAP_ATTACH_LIST = sequelize.define('MAP_ATTACH_LIST', {
		list_id:		{ type: DataTypes.INTEGER, allowNull: false },
		file_name:      { type: DataTypes.STRING },
		file_ext:       { type: DataTypes.STRING },
		file_size:      { type: DataTypes.BIGINT },
		url:			{ type: DataTypes.STRING }
	});

	return MAP_ATTACH_LIST;
};