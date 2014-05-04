/**
 * Created by Bohua on 2014-05-03.
 */

var Q = require("q");
var Bo = require("./abstract_bo");

var TAG = new Bo('REF_TAG',
	{
		name: 'translate',
		method: function (tagsInString) {
			var deferred = Q.defer();
			var tagIdArray = tagsInString.split(',');
			var promises = [];

			for (var i in tagIdArray) {
				var id = tagIdArray[i].replace('%', '');
				promises.push(this.get(id, true));
			}

			Q.allSettled(promises)
				.then(function (results) {
					var tagsArray = [];
					for (var i in results) {
						if (results[i].state === "fulfilled") {
							tagsArray.push({
								id: results[i].value.id,
								tag: results[i].value.tag,
								type: results[i].value.type,
								description: results[i].value.description
							});
						}
					}

					deferred.resolve(tagsArray);
				});

			return deferred.promise;
		}
	}, {
		name: 'getAllByType',
		method: function (type) {
			var deferred = Q.defer();

			this.orm.model(this._table).findAll({
				where: {
					type: type
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

	});

module.exports = TAG;