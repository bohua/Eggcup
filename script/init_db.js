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
			generateUser().then(function(user){
				generateKh().then(function(kh){
					generateTask().then(function(task){
						task.setKh(kh[0]);
						db.DATA_ZXDJ.find({where: {dm: 'ZXDJ20140424000001'}}).success(function(task){
							console.log(task.values);

							});
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
	db.REF_KH.bulkCreate([
		{
			mc:			'腾讯深圳总部',
			addr:		'深圳市南山区高新科技园中区一路腾讯大厦',
			tel:		'0755-86013388',
			fax:		'0755-86013399',
			lxr:		'A小姐',
			email:		'rexwang@tencent.com',
			www:		'无',
			hy:			'',
			bz:			'测试数据'
		},
		{
			mc:			'腾讯北京分公司',
			addr:		'北京市海淀区海淀大街38号银科大厦16层',
			tel:		'010-62671188',
			fax:		'010-82603119',
			lxr:		'B小姐',
			email:		'rexwang@tencent.com',
			www:		'无',
			hy:			'',
			bz:			'测试数据'
		},
		{
			mc:			'腾讯上海分公司',
			addr:		'上海市徐汇区田林路397号A楼 上海腾云大厦',
			tel:		'021-54569595',
			fax:		'021-54393079',
			lxr:		'C小姐',
			email:		'rexwang@tencent.com',
			www:		'无',
			hy:			'',
			bz:			'测试数据'
		},
		{
			mc:			'腾讯成都分公司',
			addr:		'成都市高新区拓东新街81号天府软件园二期C区4号楼',
			tel:		'028-85225111',
			fax:		'028-85980512',
			lxr:		'D小姐',
			email:		'rexwang@tencent.com',
			www:		'无',
			hy:			'',
			bz:			'测试数据'
		}
	]).success(function (sdepold) {
		//console.log(sdepold)
		deferred.resolve(sdepold);
	});

	return deferred.promise;
}

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