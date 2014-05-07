/**
 * Created by bli on 2014/5/7.
 */
var schemaReader = require(__dirname + '/../../routes/platform/readJsonSchema');
var schemaJson = __dirname + "/../../schema/status-machine-schema.json";
var Q = require('q');
var lodash = require('lodash')
var singleton = function singleton() {
	var model;

	this.translate = function (status_id) {
		var found = lodash.where(model, {code: status_id});
		if (found.length <= 0) {
			return status_id;
		} else {
			return found[0].status;
		}
	}

	this.getAll = function () {
		return model;
	}

	this.init = function () {
		var deferred = Q.defer();
		schemaReader(schemaJson).then(
			function (success) {
				model = success;
				deferred.resolve('task status service');
			},
			function (failure) {
				deferred.reject('task status service...' + failure);
			}
		);

		return deferred.promise;
	}
}

singleton.instance = null;

singleton.getInstance = function () {
	if (this.instance === null) {
		this.instance = new singleton();
	}
	return this.instance;
}

module.exports = singleton.getInstance();
