/**
 * Created by Bohua on 2014-05-03.
 */
var Q = require('q');
var db = require('../models');
var fs = require('fs');

db
	.sequelize
	.sync()
	.complete(function (err) {
		if (err) {
			throw err;
		} else {
			global.db = db;

			db.REF_EMPLOYEE.find({where: {id: '1'}}).success(function (emp) {
				emp.getTags().success(function(tags){
					console.log(emp.getDataValue('name'), ':', tags.length);
				});
			});
		}
	});