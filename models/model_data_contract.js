/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_PROPOSAL = sequelize.define('DATA_PROPOSAL', {
		/**
		 * Contract Properties
		 */
		contract_date:		{ type: DataTypes.DATE },
		contract_end_date:	{ type: DataTypes.DATE },
		contract_topic:		{ type: DataTypes.STRING },
		contract_A:			{ type: DataTypes.STRING },
		contract_B:			{ type: DataTypes.STRING }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_REPLY
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'proposalAttach'})
			}
		}
	});

	return DATA_PROPOSAL;
};