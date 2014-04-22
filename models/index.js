/**
 * Created by Bli on 14-2-14.
 */
var fs = require('fs')
	, path = require('path')
	, Sequelize = require('sequelize')
	, lodash = require('lodash')
	, sequelize = new Sequelize('doodle', 'root', 'root', {
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