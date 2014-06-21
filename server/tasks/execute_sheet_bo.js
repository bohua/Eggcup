/**
 * Created by bli on 2014/6/2.
 */
var SheetBo = require(__dirname+"/../abstract_sheet_bo");
var Q = require('q');

var EXECUTE_SHEET = new SheetBo('DATA_EXECUTE', 'DATA_EXECUTE_SUB');

EXECUTE_SHEET.get = function (where) {
	var deferred = Q.defer(),
		model = this.orm.model;

	model(this._table).find({
		include: [
			{
				model: model('DATA_EXECUTE_SUB'),
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


module.exports = EXECUTE_SHEET;