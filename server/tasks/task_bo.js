/**
 * Created by Bli on 2014/5/5.
 */
var Q = require("q");
var Bo = require(__dirname + "/../abstract_bo");
var reply_sheet_bo = require(__dirname + "/reply_sheet_bo");
var arrange_sheet_bo = require(__dirname + "/arrange_sheet_bo");
//var Sequelize = require(__dirname + "/../models").Seq().Sequelize;

var TASK = new Bo('DATA_TASK', {
	name: 'get',
	method: function (where) {
		var deferred = Q.defer();

		this.orm.model(this._table).find({
			include: [
				{
					model: this.orm.model('DATA_REPLY'),
					as: 'replySheet',
					include: [
						{
							model: this.orm.model('REF_ATTACHMENT'),
							as: 'attachment'
						}
					]
				},
				{
					model: this.orm.model('DATA_ARRANGE'),
					as: 'arrangeSheet'
				}
			],
			where: where
		}).then(
			function (success) {
				deferred.resolve(success);
			},
			function (failure) {
				deferred.reject(failure);
			});

		return deferred.promise;
	}
}, {
	name: 'save',
	method: function (model) {
		var deferred = Q.defer();

		var promises = [];

		this._save(model).then(
			function (task_instance) {
				//Save reply sheet
				if (model.replySheet) {
					reply_sheet_bo.save(model.replySheet)
						.then(function (reply_sheet_instance) {
							promises.push(task_instance.setReplySheet(reply_sheet_instance));
						});
				}

				//Save arrange sheet
				if (model.arrangeSheet) {
					arrange_sheet_bo.save(model.arrangeSheet)
						.then(function (arrange_sheet_instance) {
							promises.push(task_instance.setArrangeSheet(arrange_sheet_instance));
						});
				}

			},
			function (failure) {
				deferred.reject(failure);
			}
		);

		return Q.all(promises);
	}
});

module.exports = TASK;