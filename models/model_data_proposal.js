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
		proposal_content: 		{ type: DataTypes.TEXT},
		proposal_person:		{ type: DataTypes.STRING },
		proposal_translator:		{ type: DataTypes.STRING },

		/**
		 * Price Properties
		 */
		price_date:			{ type: DataTypes.DATE},
		price_discount: 		{ type: DataTypes.DECIMAL(10,2) },

		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }

	}, {
		classMethods: {
			associate: function (models) {
				DATA_PROPOSAL
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.DATA_PROPOSAL_SUB, {as: 'subItems', foreignKey: 'proposal_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'proposalAttach'})
			}
		}
	});

	return DATA_PROPOSAL;
};