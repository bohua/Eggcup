/**
 * Created by Bli on 2014/4/29.
 */
var Q = require("q");
var Bo = require(__dirname + "/../abstract_bo");
var _ = require('lodash');

var CUSTOEMR_CONTACT = new Bo('REF_CUSTOMER_CONTACT');

function saveContact(customer_instance, contact) {
	var deferred = Q.defer();

	CUSTOEMR_CONTACT.save(contact).then(
		function (contact_instance) {
			customer_instance.addContactList(contact_instance).then(
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

function saveContactList(customer_instance, contactList) {
	var promises = [];

	_.forEach(contactList, function (contact) {
		promises.push(saveContact(customer_instance, contact));
	})

	return Q.all(promises);
}

var CUSTOMER = new Bo('REF_CUSTOMER',
	{
		name: 'get',
		method: function (where) {
			var promise = this.orm.model(this._table).find({
				include: [
					{
						model: this.orm.model('REF_EMPLOYEE'),
						as: 'represent'
					},
					{
						model: this.orm.model('REF_CUSTOMER_CONTACT'),
						as: 'contact_list'
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
						model: this.orm.model('REF_EMPLOYEE'),
						as: 'represent'
					},
					{
						model: this.orm.model('REF_CUSTOMER_CONTACT'),
						as: 'contact_list'
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
				.then(function (customer_instance) {

				if (model.contactList) {
					customer_instance.setContactList([]).success(function(){
						saveContactList(customer_instance, model.contactList).done(function(){
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

module.exports = CUSTOMER;