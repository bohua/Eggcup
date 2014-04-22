/**
 * Created by Bli on 2014/4/2.
 */

var db = require('../models');
var fs = require('fs');

db
	.sequelize
	.sync({ force: true })
	.complete(function (err) {
		if (err) {
			throw err;
		} else {
			generateUser();
		}
	});


function generateUser() {
	db.User.create({
		user_name: 'admin',
		user_pass: 'admin'
	}).success(function (sdepold) {
		console.log(sdepold.values)
	});
}