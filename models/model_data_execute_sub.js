/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_EXECUTE_SUB = sequelize.define('DATA_EXECUTE_SUB', {
		/**
		 * Execute Sub-item Properties
		 */
		execute_date:		{ type: DataTypes.DATE },
		execute_runner:		{ type: DataTypes.STRING },
		execute_digest:		{ type: DataTypes.STRING }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_EXECUTE_SUB
					.belongsTo(models.DATA_EXECUTE, {as: 'parent', foreignKey: 'execute_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'attachment'})
			}
		}
	});

	return DATA_EXECUTE_SUB;
};