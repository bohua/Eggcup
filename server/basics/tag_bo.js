/**
 * Created by Bohua on 2014-05-03.
 */

var Q = require("q");
var Bo = require(__dirname+ "/../abstract_bo");

function findOrCreateTag(Tag, model) {
	var deferred = Q.defer();

	model.findOrCreate({ tag: Tag.tag}, { type: 'custom'})
		.success(function (success, created) {
			Tag.id = success.getDataValue('id');
			Tag.tag = success.getDataValue('tag');
			Tag.type = success.getDataValue('type');
			Tag.category = success.getDataValue('category');
			deferred.resolve(TAG);
		})
		.error(function (error) {
			deferred.reject(error);
		})

	return deferred.promise;
}

var TAG = new Bo('REF_TAG',
	{
		name: 'translate',
		method: function (tagsInString) {
			var deferred = Q.defer();
			var tagIdArray = tagsInString.split(',');
			var promises = [];

			for (var i in tagIdArray) {
				var id = tagIdArray[i].replace(/%/g, '');
				promises.push(this.get({
					id: id,
					enable: true
				}));
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
								category: results[i].value.category,
								description: results[i].value.description
							});
						}
					}

					deferred.resolve(tagsArray);
				});

			return deferred.promise;
		}
	}, {
		name: 'PersistTagList',
		method: function (tagList) {
			var deferred = Q.defer();

			//When no tags saved resolve with empty array directly
			if (!tagList || tagList.length === 0) {
				deferred.resolve([]);
				return deferred.promise;
			}

			//Make a shallow copy of tagList
			var clone = tagList.slice();

			var customTagList = [];
			for (var i in clone) {
				if (clone[i].type === 'custom') {
					customTagList.push(clone[i]);
				}
			}
			if (customTagList.length === 0) {
				deferred.resolve(clone);
			} else {
				var promises = [];
				for (var j in customTagList) {
					promises.push(findOrCreateTag(customTagList[j], this.orm.model(this._table)));
				}

				Q.allSettled(promises)
					.then(function () {
						deferred.resolve(clone);
					});
			}

			return deferred.promise;
		}
	});

module.exports = TAG;