/**
 * Created by bli on 2014/6/2.
 */
var SheetBo = require(__dirname+"/../abstract_sheet_bo");
var Q = require('q');

var APPOINTMENT_SHEET = new SheetBo('DATA_APPOINTMENT', 'DATA_APPOINTMENT_SUB');

APPOINTMENT_SHEET.get = function (where) {
	var deferred = Q.defer(),
		model = this.orm.model;

	model(this._table).find({
		include: [
			{
				model: model('DATA_APPOINTMENT_SUB'),
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


module.exports = APPOINTMENT_SHEET;