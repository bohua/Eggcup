/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_PROPOSAL = sequelize.define('DATA_PROPOSAL', {
		/**
		 * Proposal Properties
		 */
		proposal_topic:			{ type: DataTypes.STRING },
		proposal_date:			{ type: DataTypes.DATE},
		proposal_content: 		{ type: DataTypes.TEXT}
	}, {
		classMethods: {
			associate: function (models) {
				DATA_PROPOSAL
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'proposalAttach'})
			}
		}
	});

	return DATA_PROPOSAL;
};