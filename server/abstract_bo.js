/**
 * Created by Bohua on 2014-05-03.
 */
var Q = require("q");
var extend = require("extend");

var BO = function (schema) {
	this.orm = require(__dirname + "/../models");
	this._table = schema;

	this.add = function (model) {
		var deferred = Q.defer();

		this.orm.model(this._table)
			.build(model)
			.save()
			.then(function (success) {
				deferred.resolve(success);
			}, function (failure) {
				deferred.reject(failure);
			});

		return deferred.promise;
	};

	this.update = function (model) {
		var deferred = Q.defer();

		this.orm.model(this._table).find({
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
	};

	this.delete = function (id) {
		var deferred = Q.defer();

		this.orm.model(this._table).find({
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
	};

	this.get = function (where) {
		var deferred = Q.defer();

		this.orm.model(this._table).find({
			where: where
		}).then(
			function (success) {
				deferred.resolve(success);
			},
			function (failure) {
				deferred.reject(failure);
			});

		return deferred.promise;
	};

	this.getAll = function (where) {
		var deferred = Q.defer();

		this.orm.model(this._table).findAll({
			where: where
		}).then(
			function (success) {
				deferred.resolve(success);
			},
			function (failure) {
				deferred.reject(failure);
			});

		return deferred.promise;
	};

	if (arguments.length > 1) {
		for (var i in arguments) {
			//Skip the first arg
			if(i === "0"){
				continue;
			}
			this[arguments[i].name] = arguments[i].method;
		}
	}
}

module.exports = BO;