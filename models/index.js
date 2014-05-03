/**
 * Created by Bli on 14-2-14.
 */
var fs = require('fs');
var models = {};
var path = require('path');

var singleton = function singleton(){
	var Sequelize = require("sequelize");
	var sequelize = null;

	this.setup = function (database, username, password, obj){

		if(arguments.length == 2){
			sequelize = new Sequelize(database, username);
		}
		else if(arguments.length == 3){
			sequelize = new Sequelize(database, username, password);
		}
		else if(arguments.length == 4){
			sequelize = new Sequelize(database, username, password, obj);
		}
		init();
	}

	this.model = function (name){
		return models[name];
	}

	this.Seq = function (){
		return {
			Sequelize: Sequelize,
			sequelize: sequelize
		};
	}

	function init(){
		fs
			.readdirSync(__dirname)
			.filter(function (file) {
				return (file.indexOf('.') !== 0) && (file !== 'index.js' && file != 'util.js');
			})
			.forEach(function (file) {
				var model = sequelize.import(path.join(__dirname, file));
				models[model.name] = model;
			});

		Object.keys(models).forEach(function (modelName) {
			if ('associate' in models[modelName]) {
				models[modelName].associate(models);
			}
		});
	}

	if(singleton.caller != singleton.getInstance){
		throw new Error("This object cannot be instanciated");
	}
}

singleton.instance = null;

singleton.getInstance = function(){
	if(this.instance === null){
		this.instance = new singleton();
	}
	return this.instance;
}

module.exports = singleton.getInstance();





/*

	, Sequelize = require('sequelize')
	, lodash = require('lodash')
	, sequelize = new Sequelize('eggcup', 'root', 'root', {
		dialect: 'mysql',
		port: 3306,
		pool: { maxConnections: 5, maxIdleTime: 30}
	})
	, db = {};

fs
	.readdirSync(__dirname)
	.filter(function (file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js' && file != 'util.js');
	})
	.forEach(function (file) {
		var model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

module.exports = lodash.extend({
	sequelize: sequelize,
 Sequelize: Sequelize
 }, db);
	*/