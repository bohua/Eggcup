/**
 * Created by Bohua on 2014-05-03.
 */
var Q = require('q');
var db = require('../models');
var fs = require('fs');

var task_bo = require(__dirname + '/../server/tasks/task_bo.js');

db.setup('eggcup', 'root', 'root', {
	dialect: 'mysql',
	port: 3306,
	pool: { maxConnections: 5, maxIdleTime: 30}
});


db.Seq()
	.sequelize
	.sync()
	.complete(function (err) {
		if (err) {
			throw err;
		} else {
			global.db = db;

			testEagerLoadTask();
			//testGetTaskFromEmployee();
			//testEagerLoading();
			//testGetAttachments();
		}
	});

function testGetTaskFromEmployee(){
	db.model('REF_EMPLOYEE').find({where: {id: '1'}}).success(function (emp) {
		emp.getDATATASKs().success(function(tasks){
			console.log(JSON.stringify(tasks));
		});
	});
}

function testEagerLoading(){
	db.model('DATA_TASK')
		.find({
			where: {
				id: 1001
			},
			include: [
				{
					model: db.model('REF_EMPLOYEE'),
					as: 'assignee'
				},
				{
					model: db.model('REF_EMPLOYEE'),
					as: 'reporter'
				},
				{
					model: db.model('REF_CUSTOMER'),
					as: 'customer'
				}
			]
		}).success(function(task){
			console.log(JSON.stringify(task));
		});
}

function testGetAttachments(){
	db.model('DATA_TASK')
		.find({
			where: {
				id: 1001
			}
		}).success(function(task){
			task.getReplyAttach().success(function(attaches){
				console.log(JSON.stringify(attaches));
			});
		});
}

function testEagerLoadTask(){
	task_bo.get({
		id: '1005'
	}).then(function(success){
//		console.log(JSON.stringify(success));
		console.log(success);

	});
}