/**
 * Created by Bli on 2014/4/29.
 */
var Q = require("q");
var Bo = require(__dirname + "/../abstract_bo");

var CUSTOMER = new Bo('REF_CUSTOMER',
	{
		name: 'get',
		method: function (where) {
			var promise = this.orm.model(this._table).find({
				include: [
					{
						model: this.orm.model('REF_EMPLOYEE'),
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
						model: this.orm.model('REF_EMPLOYEE'),
						as: 'represent'
					}
				],
				where: where
			});

			return promise;
		}
	}
);

module.exports = CUSTOMER;