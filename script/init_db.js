/**
 * Created by Bli on 2014/4/2.
 */
var Q = require('q');
var db = require('../models');
var fs = require('fs');

db
	.sequelize
	.sync({ force: true })
	.complete(function (err) {
		if (err) {
			throw err;
		} else {
			global.db = db;

			generateUser().then(function(){
				generateKh().then(function(cus_list){
					generateEmployee().then(function(emp_list){

						/*
						task.setKh(kh[0]);
						db.DATA_ZXDJ.find({where: {dm: 'ZXDJ20140424000001'}}).success(function(task){
							console.log(task.values);

							});
							*/
					});
				});
			});

		}
	});


function generateUser() {
	var deferred = new Q.defer();
	db.User.create({
		user_name: 'admin',
		user_pass: 'admin'
	}).success(function (sdepold) {
		console.log(sdepold.values)
		deferred.resolve(sdepold);
	});

	return deferred.promise;
}

function generateKh(){
	var deferred = new Q.defer();
	db.REF_CUSTOMER.bulkCreate([
		{
			name:		'腾讯深圳总部',
			address:	'深圳市南山区高新科技园中区一路腾讯大厦',
			tel:		'0755-86013388',
			fax:		'0755-86013399',
			contact:	'A小姐',
			email:		'rexwang@tencent.com',
			website:		'无',
			membership:			'',
			description:'测试数据'
		},
		{
			name:		'腾讯北京分公司',
			address:	'北京市海淀区海淀大街38号银科大厦16层',
			tel:		'010-62671188',
			fax:		'010-82603119',
			contact:	'B小姐',
			email:		'rexwang@tencent.com',
			website:	'无',
			membership:	'',
			description:'测试数据'
		},
		{
			name:		'腾讯上海分公司',
			address:	'上海市徐汇区田林路397号A楼 上海腾云大厦',
			tel:		'021-54569595',
			fax:		'021-54393079',
			contact:	'C小姐',
			email:		'rexwang@tencent.com',
			website:	'无',
			membership:	'',
			description:'测试数据'
		},
		{
			name:		'腾讯成都分公司',
			address:	'成都市高新区拓东新街81号天府软件园二期C区4号楼',
			tel:		'028-85225111',
			fax:		'028-85980512',
			contact:	'D小姐',
			email:		'rexwang@tencent.com',
			website:	'无',
			membership:	'',
			description:'测试数据'
		}
	]).success(function (sdepold) {
		//console.log(sdepold)
		deferred.resolve(sdepold);
	});

	return deferred.promise;
}

function generateEmployee(){
	var deferred = new Q.defer();
	db.REF_EMPLOYEE.bulkCreate([
		{
			name:			'李小帅',
			tel:			'+467895642134',
			mobile:			'+467895642134',
			role:			'业务员',
			description:	'测试数据'
		},
		{
			name:			'苏小美',
			tel:			'+8662314567',
			mobile:			'+8613956482456',
			role:			'接待员',
			description:	'测试数据'
		},
		{
			name:			'喵小宝',
			tel:			'021-63548975',
			mobile:			'13802146587',
			role:			'形象代言',
			description:	'测试数据'
		}
	]).success(function (sdepold) {
		//console.log(sdepold)
		deferred.resolve(sdepold);
	});

	return deferred.promise;
}

/*
function generateTask(){
	var deferred = new Q.defer();

	db.DATA_ZXDJ.create({
		dm:			'ZXDJ20140424000001',
		zxfs1:		true,
		zxzt:		'关于建立咨询管理软件',
		zxsx:		'暂无',
		ydqx1:		true,
		ydqx2:		true,
		djr:		'李小帅',
		djdate:		'2014-04-24',
		psdate:		'2014-04-24',
		clr:		'李小帅',
		clfs:		'自建'
	}).success(function (sdepold) {
		console.log(sdepold.values)
		deferred.resolve(sdepold);
	});

	return deferred.promise;
}
*/