/**
 * Created by Bli on 2014/4/29.
 */
var Q = require("q");
var Bo = require(__dirname + "/../abstract_bo");

var CUSTOEMR_CONTACT = new Bo('REF_CUSTOMER_CONTACT');

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
			var save_handler = this._save(model);

			save_handler.then(function (customer_instance) {

				//Save contact list
				if (model.contactList) {
					customer_instance.setContactList([]).success(function () {
						for (var i in model.contactList) {
							CUSTOEMR_CONTACT.save(model.contactList[i])
								.then(
								function (contact_instance) {
									customer_instance.addContactList(contact_instance);
								},
								function (error) {
									global.logger.error(error);
								}
							);
						}
					});
				}


				//Save sub items
//				if (sub_item_handler && model.subItem && sheet_instance.addSubItem) {
//					sheet_instance.setSubItem([]).success(function () {
//						for (var i in model.subItem) {
//							new SHEET(sub_item_handler).save(model.subItem[i])
//								.then(
//								function (sub_item_instance) {
//									sheet_instance.addSubItem(sub_item_instance);
//								},
//								function (error) {
//									global.logger.error(error);
//								});
//
//						}
//					});
//				}
			});

			return save_handler;
		}
	});

module.exports = CUSTOMER;