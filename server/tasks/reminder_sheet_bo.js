/**
 * Created by bli on 2014/6/2.
 */
var SheetBo = require(__dirname+"/../abstract_sheet_bo");
var Q = require('q');

var REMINDER_SHEET = new SheetBo('DATA_REMINDER', 'DATA_REMINDER_SUB');

REMINDER_SHEET.get = function (where) {
	var deferred = Q.defer(),
		model = this.orm.model;

	model(this._table).find({
		include: [
			{
				model: model('DATA_REMINDER_SUB'),
				as: 'subItem'
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


module.exports = REMINDER_SHEET;