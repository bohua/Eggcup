/**
 * Created by bli on 2014/8/14.
 */
var Q = require("q");
var Bo = require(__dirname + "/../abstract_bo");
var _ = require('lodash');

var SUB_BO = new Bo('DATA_WORDPRESS_SUB');

function saveItem(parent_instance, item) {
	var deferred = Q.defer();

	SUB_BO.save(item).then(
		function (item_instance) {
			parent_instance.addSubItem(item_instance).then(
				function (success) {
					deferred.resolve();
				},
				function (error) {
					global.logger.error(error);
					deferred.reject();
				}
			);
		},
		function (error) {
			global.logger.error(error);
			deferred.reject();
		}
	);

	return deferred.promise;
}

function saveSubItem(parent_instance, subItem) {
	var promises = [];

	_.forEach(subItem, function (item) {
		promises.push(saveItem(parent_instance, item));
	})

	return Q.all(promises);
}

var WORDPRESS = new Bo('DATA_WORDPRESS',
	{
		name: 'get',
		method: function (where) {
			var promise = this.orm.model(this._table).find({
				include: [
					{
						model: this.orm.model('DATA_WORDPRESS_SUB'),
						as: 'represent'
					}
				],
				where: where
			});

			return promise;
		}
	},
	{
		name: 'getAll',
		method: function (where) {
			var promise = this.orm.model(this._table).findAll({
				include: [
					{
						model: this.orm.model('DATA_WORDPRESS_SUB'),
						as: 'represent'
					}
				],
				where: where
			});

			return promise;
		}
	},
	{
		name: 'save',
		method: function (model) {
			//var save_handler = this._save(model);
			var deferred = Q.defer();

			this._save(model)
				.then(function (parent_instance) {

					if (model.subItem) {
						parent_instance.setSubItem([]).success(function(){
							saveSubItem(parent_instance, model.subItem).done(function(){
								deferred.resolve();
							},function(){
								deferred.reject();
							});
						});
					} else{
						deferred.resolve();
					}
				});

			return deferred.promise;
		}
	});

module.exports = WORDPRESS;