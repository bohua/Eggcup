/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_PROPOSAL_SUB = sequelize.define('DATA_PROPOSAL_SUB', {
		/**
		 * Price Sub-item Properties
		 */
		service:			{ type: DataTypes.STRING },
		date:				{ type: DataTypes.DATE },
		expense:			{ type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 },
		traffic:			{ type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 },
		extra:				{ type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 }
	}, {
		classMethods: {
			associate: function (models) {
				DATA_PROPOSAL_SUB
					.belongsTo(models.DATA_PROPOSAL, {as: 'parent', foreignKey: 'proposal_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'priceAttach'})
			}
		}
	});

	return DATA_PROPOSAL_SUB;
};