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
	.sync({ force: true })
	.complete(function (err) {
		if (err) {
			throw err;
		} else {
			global.db = db;

			Q.allResolved([generateKh(), generateTag(), generateEmployee(),generateTask()])
				.then(function(){
					db.model('DATA_TASK')
						.find({where: {id: 1001}})
						.success(function(task){
							db.model('REF_EMPLOYEE').find({
								where:{id:1}
							}).success(function(employee){
								//console.log('task:', task);
								//console.log('employee:', employee);
								//task.addAssignee(employee);
								task.addAssignee(employee);
							});
						})
				});

		}
	});


function generateKh() {
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
			description: '测试数据'
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
			description: '测试数据'
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
			description: '测试数据'
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
			description: '测试数据'
		}
	]).success(function (sdepold) {
		//console.log(sdepold)
		deferred.resolve(sdepold);
	});

	return deferred.promise;
}

function generateEmployee() {
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

function generateTask() {
	var deferred = new Q.defer();
	db.model('DATA_TASK').bulkCreate([
		{
			id: 1001,
			customer: 1,
			reporter: 1,
			assignee: 1,
			topic: '沙石厂关于下水污染问题的咨询解答，酌情予以妥善安排',
			description: '测试数据'
		},
		{
			customer: 2,
			reporter: 2,
			assignee: 3,
			topic: '小明的足球',
			status: 450,
			description: '测试数据'
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