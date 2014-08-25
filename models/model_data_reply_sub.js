/**
 * Created by Bohua on 2014-05-23.
 */

module.exports = function (sequelize, DataTypes) {

	var DATA_REPLY_SUB = sequelize.define('DATA_REPLY_SUB', {
		/**
		 * Reply Properties
		 */
		reply_withEmail:		{ type: DataTypes.BOOLEAN, defaultValue: false },
		reply_withTel:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		reply_withF2F:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		reply_withFax:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		reply_date:				{ type: DataTypes.DATE },
		consult_person:			{ type: DataTypes.STRING },
		reply_person:			{ type: DataTypes.STRING},
		translate_person:		{ type: DataTypes.STRING},

		/**
		 * F2F Properties
		 */
		meeting_address:		{ type: DataTypes.STRING },
		meeting_people_A:		{ type: DataTypes.STRING },
		meeting_people_B:		{ type: DataTypes.STRING },

		consult_context:		{ type: DataTypes.TEXT },
		reply_context:			{ type: DataTypes.TEXT },
		law_context:			{ type: DataTypes.TEXT }

	}, {
		classMethods: {
			associate: function (models) {
				DATA_REPLY_SUB
					.belongsTo(models.DATA_REPLY, {as: 'parent', foreignKey: 'reply_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'attachment'})
			}
		}
	});

	return DATA_REPLY_SUB;
};