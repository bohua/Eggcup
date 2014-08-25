/**
 * Created by Bohua on 2014-06-01.
 */
var SheetBo = require(__dirname + "/../abstract_sheet_bo");
var Q = require('q');

var REPLY_SHEET = new SheetBo('DATA_REPLY', 'DATA_REPLY_SUB');

REPLY_SHEET.get = function (where) {
	var deferred = Q.defer(),
		model = this.orm.model;

	model(this._table).find({
		include: [
			{
				model: model('DATA_REPLY_SUB'),
				as: 'subItem',
				include: [
					{
						model: model('REF_ATTACHMENT'),
						as: 'attachment'
					}
				]
			}
		],
		where: where
	}).then(
		function (success) {
			deferred.resolve(success);
		},
		function (failure) {
			global.logger.error(failure);
			deferred.reject(failure);
		});

	return deferred.promise;
};

module.exports = REPLY_SHEET;