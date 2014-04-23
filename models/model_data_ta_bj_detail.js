/**
 * Created by Bli on 2014/4/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_TA_BJ_DETAIL = sequelize.define('DATA_TA_BJ_DETAIL', {
		nr:				{ type: DataTypes.STRING },
		rq:				{ type: DataTypes.DATE },
		fy:				{ type: DataTypes.DECIMAL(16,2) },
		fy2:			{ type: DataTypes.DECIMAL(16,2) },
		fy3:			{ type: DataTypes.DECIMAL(16,2) },
		je:				{ type: DataTypes.DECIMAL(16,2) },
		xh:				{ type: DataTypes.INTEGER },
		bz:				{ type: DataTypes.STRING }
	});

	return DATA_TA_BJ_DETAIL;
};