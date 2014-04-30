/**
 * Created by Bli on 2014/4/29.
 */
var Q = require("q")

var Employee = {
	add: function (model) {
		var deferred = Q.defer();

		global.db.REF_EMPLOYEE
			.build(model)
			.save()
			.then(function (success) {
				deferred.resolve(success);
			}, function (failure) {
				deferred.reject(failure);
			});

		return deferred.promise;
	},

	update: function (model) {
		var deferred = Q.defer();

		global.db.REF_EMPLOYEE.find({
			where: {
				id: model.id
			}
		}).then(function (success) {
			if (success) {
				success
					.updateAttributes(model)
					.then(function (success) {
						deferred.resolve(success);
					}, function (failure) {
						deferred.reject(failure);
					});
			}
		}, function (failure) {
			deferred.reject(failure);
		});

		return deferred.promise;
	},

	delete: function (id) {
		var deferred = Q.defer();

		global.db.REF_EMPLOYEE.find({
			where: {
				id: id
			}
		}).then(function (success) {
			if (success) {
				success
					.destroy()
					.then(function (success) {
						deferred.resolve(success);
					}, function (failure) {
						deferred.reject(failure);
					});
			}
		}, function (failure) {
			deferred.reject(failure);
		});

		return deferred.promise;
	},

	get: function (id, enabledOnly) {
		var deferred = Q.defer();

		global.db.REF_EMPLOYEE.find({
			where: {
				id: id,
				enable: enabledOnly
			}
		}).then(
			function (success) {
				deferred.resolve(success);
			},
			function (failure) {
				deferred.reject(failure);
			});

		return deferred.promise;
	},

	getAll: function (enabledOnly) {
		var deferred = Q.defer();

		global.db.REF_EMPLOYEE.findAll({
			where: {
				enable: enabledOnly
			}
		}).then(
			function (success) {
				deferred.resolve(success);
			},
			function (failure) {
				deferred.reject(failure);
			});

		return deferred.promise;
	}
}

module.exports = Employee;