/**
 * Created by Bli on 2014/4/29.
 */
var Bo = require(__dirname + "/../abstract_bo");
var login_bo = require(__dirname + "/login_bo");

var EMPLOYEE = new Bo('REF_EMPLOYEE', {
	name: 'get',
	method: function (where) {
		var promise = this.orm.model(this._table).find({
			include: [
				{
					model: this.orm.model('REF_LOGIN'),
					as: 'login'
				}
			],
			where: where
		});

		return promise;
	}
}, {
	name: 'save',
	method: function (model) {
		var promise = this._save(model);

		promise.then(
			function (employee_instance) {
				if (model.login) {
					login_bo.save(model.login)
						.then(function (login_instance) {
							employee_instance.setLogin(login_instance);
						}, function (failure) {
							global.logger.error(failure);
						});
				}
			},
			function (failure) {
				global.logger.error(failure);
			}
		);

		return promise;
	}
});

module.exports = EMPLOYEE;