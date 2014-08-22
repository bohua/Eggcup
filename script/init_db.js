/**
 * Created by Bli on 2014/4/2.
 */
var Q = require('q');
var db = require('../models');
var fs = require('fs');
var mysql = require('mysql');
var customer_bo = require('../server/basics/customer_bo')

//		connection.query('SELECT CONCAT("SET FOREIGN_KEY_CHECKS=0;", "DROP TABLE ", GROUP_CONCAT(table_name), ";") FROM information_schema.tables WHERE table_schema = "eggcup" and table_name like "%";')

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root'
});

connection.query('drop database if exists `eggcup`', function (err) {
	if (err) throw err;

	connection.query('create database `eggcup` DEFAULT CHARSET=utf8', function (err) {
		if (err) throw err;

		connection.end();

		syncDB(db);
	});
});

function syncDB(db) {
	db.setup('eggcup', 'root', 'root', {
		dialect: 'mysql',
		port: 3306,
		pool: { maxConnections: 5, maxIdleTime: 30}
	});

	db.Seq()
		.sequelize
		.sync({ force: true })
		.complete(function (err) {
			if (err) {
				throw err;
			} else {
				afterAll(db);
			}
		});
}


function afterAll(db) {
	//Do data initializations
	generateEmployee(db);
	generateKh(db);
	generateLoginAccount(db);

	//Word press
	generateWordpress(db);

	//Initialize test cases
	//require(__dirname + '/init_test_cases');
}

function generateKh(db) {
	//var deferred = new Q.defer();
	return customer_bo.save(
		{
			name: '腾讯深圳总部',
			address: '深圳市南山区高新科技园中区一路腾讯大厦',
			fax: '0755-86013399',
			website: '无',
			membership: '',
			description: '测试数据',
			contactList: [
				{
					contact: 'A小姐',
					tel: '0755-86000001',
					email: 'a@tencent.com'
				},
				{
					contact: 'X小姐',
					tel: '0755-86000002',
					email: 'x@tencent.com'
				},
				{
					contact: 'Y小姐',
					tel: '0755-86000003',
					email: 'y@tencent.com'
				}
			]
		});

	//deferred.promise;
}

function generateEmployee(db) {
	var deferred = new Q.defer();
	db.model('REF_EMPLOYEE').bulkCreate([
		{
			name: '管理员',
			tel: '+467895642134',
			mobile: '+467895642134',
			role: '管理员',
			description: '测试数据',
			hasLogin: true
		},
		{
			name: '李小帅',
			tel: '+467895642134',
			mobile: '+467895642134',
			role: '业务员',
			description: '测试数据',
			tags: "%1%,%3%"
		},
		{
			name: '苏小美',
			tel: '+8662314567',
			mobile: '+8613956482456',
			role: '接待员',
			description: '测试数据',
			tags: "%2%"
		},
		{
			name: '喵小宝',
			tel: '021-63548975',
			mobile: '13802146587',
			role: '形象代言',
			description: '测试数据',
			tags: "%3%"
		}
	]).success(function (sdepold) {
		//console.log(sdepold)
		deferred.resolve(sdepold);
	});

	return deferred.promise;
}

function generateLoginAccount(db) {
	var deferred = new Q.defer();
	db.model('REF_LOGIN').bulkCreate([
		{
			username: '管理员',
			password: '8888',
			level: 'admin',
			employee_id: '1'
		}
	]).success(function (sdepold) {
		//console.log(sdepold)
		deferred.resolve(sdepold);
	});

	return deferred.promise;
}


function generateTag() {
	/*
	 var tags = [];

	 tags.push(db.DATA_ZXDJ.build({
	 tag: '可分配',
	 type: 'config'
	 }));

	 tags.push(db.DATA_ZXDJ.build({
	 tag: '外部',
	 type: 'config'
	 }));
	 tags.push(db.DATA_ZXDJ.build({
	 tag: '管理员',
	 type: 'permit'
	 }));


	 return tags;
	 */

	var deferred = new Q.defer();
	db.model('REF_TAG').bulkCreate([
		{
			tag: '可分配',
			type: 'config'
		},
		{
			tag: '外部',
			type: 'config'
		},
		{
			tag: '管理员',
			type: 'permit'
		}
	]).success(function (sdepold) {
		//console.log(sdepold)
		deferred.resolve(sdepold);
	});

	return deferred.promise;

}

function generateWordpress() {
	var wordpress_bo = require(__dirname + '/../server/wordpress/wordpress_bo.js');

	wordpress_bo.save({
		owner: '李小帅',
		creator: '李小帅',
		customer_name: '刘备军突击团',
		customer_address: '荆州新野县县衙',
		customer_tel: '8888-546B',
		customer_email: 'empire_uncle_liu@sanguo.com',
		customer_contact: '赵小云',
		topic: '关于如何抵御夏侯敦20万大军进犯',
		description: '公元207年秋，曹操平定北方，遂遣大将夏侯元让，帅大军二十万，直取荆州，新野县为荆北门户，若有所失，荆州则危矣',
		status: '新问题',

		subItem: [
			{
				id: 1,
				owner: '赵小云',
				content: '曹军来犯，如何是好？',
				is_customer_word: true,
				importance: 3,
				has_read: false
			},
			{
				id: 2,
				owner: '赵小云',
				content: '曹军来犯，如何是好？你咋不回我？',
				is_customer_word: true,
				importance: 0,
				has_read: true
			},
			{
				id: 3,
				owner: '李小帅',
				content: '子曰： 急个屁！ 去隆中找诸葛大大帮忙',
				is_customer_word: false,
				importance: 0,
				has_read: true
			},
			{
				id: 4,
				owner: '刘小备',
				content: '请问诸葛先生做什么工作的，一天到晚不在家？',
				is_customer_word: true,
				importance: 0,
				has_read: true
			},
			{
				id: 5,
				owner: '李小帅',
				content: '貌似兼职导游， 多去几次呗，么么达',
				is_customer_word: false,
				importance: 0,
				has_read: true
			},
			{
				id: 6,
				owner: '关小羽',
				content: '他家书童为什么可以这么吊？ 我可以打他么？',
				is_customer_word: true,
				importance: 0,
				has_read: true
			},
			{
				id: 7,
				owner: '李小帅',
				content: '打人范法',
				is_customer_word: false,
				importance: 0,
				has_read: true
			},
			{
				id: 8,
				owner: '张小飞',
				content: '那偶可以烧他家房子么？',
				is_customer_word: true,
				importance: 0,
				has_read: true
			},
			{
				id: 9,
				owner: '李小帅',
				content: '哪儿凉快哪儿烧去',
				is_customer_word: false,
				importance: 0,
				has_read: true
			}
		]
	});
}