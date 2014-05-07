/**
 * Created by Bli on 2014/4/28.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_TASK = sequelize.define('DATA_TASK', {
		code:			{ type: DataTypes.STRING, allowNull: false },
		customer:		{ type: DataTypes.INTEGER },
		employee:		{ type: DataTypes.INTEGER },
		topic:			{ type: DataTypes.STRING, defaultValue: '暂无主题' },
		status:			{ type: DataTypes.INTEGER, defaultValue: 100 },
		description:	{ type: DataTypes.STRING }
	},{
		classMethods: {
			associate: function (models) {
				DATA_TASK
					.hasOne(models.DATA_ZXDJ, {as:'register'})
					.hasOne(models.DATA_ZXSH, {as:'distribute'})
					.hasOne(models.DATA_TA, {as:'proposal'})
					.hasOne(models.DATA_HT, {as:'contract'});
			}
		}
	});

	return DATA_TASK;
};
