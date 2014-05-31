/**
 * Created by bli on 2014/5/23.
 */
module.exports = function (sequelize, DataTypes) {

	var DATA_REPLY = sequelize.define('DATA_REPLY', {
		/**
		 * Reply Properties
		 */
		reply_withEmail: { type: DataTypes.BOOLEAN, defaultValue: false },
		reply_withTel: { type: DataTypes.BOOLEAN, defaultValue: false },
		reply_withF2F: { type: DataTypes.BOOLEAN, defaultValue: false },
		reply_withFax: { type: DataTypes.BOOLEAN, defaultValue: false },
		reply_date: { type: DataTypes.DATE },
		consult_person: { type: DataTypes.STRING },
		reply_person: { type: DataTypes.STRING},
		translate_person: { type: DataTypes.STRING},

		/**
		 * F2F Properties
		*/
		meeting_address: { type: DataTypes.STRING },
		meeting_people_A: { type: DataTypes.STRING },
		meeting_people_B: { type: DataTypes.STRING },

		consult_context: { type: DataTypes.TEXT },
		reply_context: { type: DataTypes.TEXT },
		law_context: { type: DataTypes.TEXT },

		/**
		 * Sheet Properties
		 */
		prop_internal:			{ type: DataTypes.BOOLEAN, defaultValue: false },
		prop_external:			{ type: DataTypes.BOOLEAN, defaultValue: false }

	}, {
		classMethods: {
			associate: function (models) {
				DATA_REPLY
					.belongsTo(models.DATA_TASK, {as: 'task', foreignKey: 'task_id'})
					.hasMany(models.REF_ATTACHMENT, {as: 'replyAttach'})
			}
		}
	});

	return DATA_REPLY;
};