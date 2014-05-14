/**
 * Created by Bli on 2014/4/28.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_TASK = sequelize.define('DATA_TASK', {
		customer:		{ type: DataTypes.INTEGER },
		reporter:		{ type: DataTypes.INTEGER },
		assignee:		{ type: DataTypes.INTEGER },
		handling:       { type: DataTypes.INTEGER },
		topic:			{ type: DataTypes.STRING, defaultValue: '暂无主题' },
		status:			{ type: DataTypes.INTEGER, defaultValue: 100 },
		description:	{ type: DataTypes.TEXT },
		tags:			{ type: DataTypes.STRING },

		/**
		 * Other Properties
		 */
		prop_isEmail:	{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isTel:		{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isF2F:		{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_isFax:		{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_internal:	{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:	{ type: DataTypes.BOOLEAN, defaultValue: false }
	},{
		classMethods: {
			associate: function (models) {
				DATA_TASK
					.hasOne(models.DATA_ZXSH, {as:'distribute'})
					.hasOne(models.DATA_TA, {as:'proposal'})
					.hasOne(models.DATA_HT, {as:'contract'});
			}
		}
	});

	return DATA_TASK;
};
