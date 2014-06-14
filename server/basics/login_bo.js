/**
 * Created by Bohua on 2014-06-14.
 */
var Bo = require(__dirname+ "/../abstract_bo");

var LOGIN = new Bo('REF_LOGIN',{
	name: 'login',
	method: function (where) {
		var promise = this.orm.model(this._table).find({
			include: [
				{
					model: this.orm.model('REF_EMPLOYEE'),
					as: 'employee'
				}
			],
			where: where
		});

		return promise;
	}
});

module.exports = LOGIN;