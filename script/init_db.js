/**
 * Created by Bli on 2014/4/2.
 */
var Q = require('q');
var db = require('../models');
var fs = require('fs');

db.setup('eggcup', 'root', 'root', {
	dialect: 'mysql',
	port: 3306,
	pool: { maxConnections: 5, maxIdleTime: 30}
});

db.Seq()
	.sequelize
	.query('SELECT CONCAT("SET FOREIGN_KEY_CHECKS=0;", "DROP TABLE ", GROUP_CONCAT(table_name), ";") FROM information_schema.tables WHERE table_schema = "eggcup" and table_name like "%";')
	.success(function () {
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
	}).error(function(error){
		console.log(error);
	});

function afterAll(db) {
	//Do data initializations
	generateEmployee(db);
	generateKh(db);
	//Initialize test cases
	require(__dirname+ '/init_test_cases');
}

function generateKh(db) {
	var deferred = new Q.defer();
	db.model('REF_CUSTOMER').bulkCreate([
		{
			name: '腾讯深圳总部',
			address: '深圳市南山区高新科技园中区一路腾讯大厦',
			tel: '0755-86013388',
			fax: '0755-86013399',
			contact: 'A小姐',
			email: 'rexwang@tencent.com',
			website: '无',
			membership: '',
			description: '测试数据',
			employee_id: 1
		},
		{
			name: '腾讯北京分公司',
			address: '北京市海淀区海淀大街38号银科大厦16层',
			tel: '010-62671188',
			fax: '010-82603119',
			contact: 'B小姐',
			email: 'rexwang@tencent.com',
			website: '无',
			membership: '',
			description: '测试数据',
			employee_id: 2
		},
		{
			name: '腾讯上海分公司',
			address: '上海市徐汇区田林路397号A楼 上海腾云大厦',
			tel: '021-54569595',
			fax: '021-54393079',
			contact: 'C小姐',
			email: 'rexwang@tencent.com',
			website: '无',
			membership: '',
			description: '测试数据',
			employee_id: 3
		},
		{
			name: '腾讯成都分公司',
			address: '成都市高新区拓东新街81号天府软件园二期C区4号楼',
			tel: '028-85225111',
			fax: '028-85980512',
			contact: 'D小姐',
			email: 'rexwang@tencent.com',
			website: '无',
			membership: '',
			description: '测试数据',
			employee_id: 1
		}
	]).success(function (sdepold) {
		//console.log(sdepold)
		deferred.resolve(sdepold);
	});

	return deferred.promise;
}

function generateEmployee(db) {
	var deferred = new Q.defer();
	db.model('REF_EMPLOYEE').bulkCreate([
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