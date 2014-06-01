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

			/*Q.allSettled([generateKh(), generateTag(), generateEmployee(), generateTask(), generateAttachments()])
				.then(function () {
					db.model('REF_ATTACHMENT').findAll().success(function (attachments) {
						db.model('REF_CUSTOMER').findAll().success(function (customers) {
							db.model('DATA_TASK').findAll().success(function (tasks) {
								db.model('REF_EMPLOYEE').findAll().success(function (employees) {
									//tasks[0].setReplyAttach([attachments[0], attachments[1]]);
									//tasks[0].setProposalAttach([attachments[2]]);
								});
							})
						});
					});
				}
			);*/
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

function generateAttachments() {
	var deferred = new Q.defer();
	db.model('REF_ATTACHMENT').bulkCreate([
		{
			file_name: '1.docx',
			file_ext: 'docx',
			file_size: '168309098',
			url: 'localhost://attachments/test/1.docx'
		},
		{
			file_name: '2.xlsx',
			file_ext: 'xlsx',
			file_size: '24830909',
			url: 'localhost://attachments/test/2.xlsx'
		},
		{
			file_name: '3.pdf',
			file_ext: 'pdf',
			file_size: '12368309098',
			url: 'localhost://attachments/test/3.pdf'
		}
	]).success(function (sdepold) {
		//console.log(sdepold)
		deferred.resolve(sdepold);
	});

	return deferred.promise;

}

function generateTask() {
	var deferred = new Q.defer();
	db.model('DATA_TASK').create(
		{
			id: 1001,
			slogan: '朝廷咨询，高优先',
			description: '朝廷咨询案例，测试用例',
			status: 450,
			report_date: '2014-05-01',
			reporter: '李小帅',
			assignee: '苏小美, 喵小宝',
			tags: '重要, 测试, 朝廷',
			handling: '提案解答',
			register_topic: '朝廷咨询 2014-05-05',
			register_content: '康熙六年（1667年），吴三桂以目疾请解除总管云贵两行省事务，康熙帝批准，责令云贵两省督抚管理。康熙十二年（1673年）三月，平南王尚可喜疏请归老辽东，由其子尚之信继续镇守广东，清廷以尚之信跋扈难制，令尚之信撤藩。吴三桂和耿精忠于是年七月先后疏请撤兵，以试探朝廷动静，这时朝中对于三藩的处置分成两派，索额图、图海等以为三藩不可动，户部尚书米思翰、兵部尚书明珠则赞成撤藩。康熙帝说：“三桂等蓄谋久，不早除之，将养痈成患。今日撤亦反，不撤亦反，不若先发。”[8]康熙遂下令三藩俱撤还山海关外。吴三桂率先举兵反叛，以反清复明为号召，自称“总统天下水陆大元帅、兴明讨虏大将军”，分兵攻陷湖南、四川。耿精忠（耿继茂之子）、平南王尚可喜之子尚之信先后响应于福建和广东，广西孙延龄、陕西王辅臣亦反，台湾奉明朔的延平郡王郑经也率大军十五万登陆福建；吴三桂急派其得力大将左都督王屏藩出兵汉中前往支援；郑蛟麟与王辅臣部在陕西平阳关围歼清将莫洛所率十万余人，莫洛阵亡。清廷的西线战场形势趋于严峻。康熙帝只得集中主力南征吴三桂，同时停撤平南、靖南二藩。吴三桂起兵之初，一路势如破竹，占据云贵、湘、蜀大部分地区，清军的主力几乎被吴三桂军消灭。形势对吴三桂有利，刘玄初等力谏吴三桂挥军跨过长江。但是吴军主力一直停留在江南，“划江而守”，以致失去良机。自康熙十五年（1676年）起，战场形势开始有利于清军，陕西的王辅臣与清廷对峙三年之后，终于接受康熙的招抚，耿精忠势穷乞降，尚之信也继而降清。吴三桂占领湖南后，未趁王辅臣之响应，溯江北上，坐失战机，而清军则贯注全力，收复湖南大片土地。康熙十七年（1678年），吴三桂在衡州（今湖南衡阳）称帝，国号“大周”，改元“昭武”，大封百官诸将。当年八月十七日秋，吴三桂病死，马宝等迎其孙吴世璠继承帝位，改元洪化，扶柩返回云南。清大将军察尼趁吴军军心不稳攻击岳州（今湖南岳阳），“岳州为湖南咽喉要地，必此地恢复，则长沙、荆州之兵始能前进”。康熙十八年正月，清兵攻岳州，局势急转直下，连克常德、衡州等地。吴军退据武岗、辰龙关（湖南沅陵官庄镇境内）。三月间，勒尔锦部至辰龙关附近，但见群山林立，林深路险，[9]不敢进兵，“急行退还”，圣祖对勒尔锦给予严厉申斥。[10]。八月，岳乐、喇布等攻破武岗，十九年三月攻破辰龙关。大将军安亲王岳乐攻克湖南长沙，大将军简亲王喇布收复衡州，傅宏烈等部收复桂林，陕甘清军收复汉中、重庆、成都。康熙十九年（1680年）十月，吴世璠退回昆明。至此湘、蜀、黔、桂等省被清军次第收复。康熙十九年（1680年）三月赵良栋建议自湖南、广西、四川三路合击，进取云贵。康熙二十年（1681年），云贵总督蔡毓荣主攻，统合定远平寇大将军彰泰、赖塔等从蜀、黔、桂三路入云南，占五华山，围昆明，至十月，城内粮食不继，文武大臣纷纷投降。十月赵良栋指挥所部绿营兵率先攻破昆明，余众将从攻涌入，二十八日吴世璠绝望自杀，十月二十九日吴军出城投降。[11]王屏藩和陈君极自缢死。被俘的吴之茂、韩晋卿、张起龙等解送北京。[12]至此历时八年，蔓延十省的三藩之乱才平定下来。三藩之乱的平定，稳固了满清政局。此后攻取明郑的思明州（厦门），使前明故土完全纳入清廷的掌控，以及往后康雍乾三帝疆域的拓展，“康雍乾盛世”也由此开端。',
			customer_name: '大清尚书省',
			customer_contact: '康熙',
			customer_tel: '13567894561',
			customer_address: '一环紫禁城，乾清宫上书房',
			customer_email: 'brother4@tianchao.com',
			prop_isEmail: true,
			prop_isTel: true,
			prop_isF2F: true,
			prop_isFax: true,
			prop_internal: true,
			prop_external: false
		}
	).success(function (task) {
			db.model('DATA_REPLY').create(
				{
					reply_withEmail:	true,
					reply_withTel:		true,
					reply_withF2F:		true,
					reply_withFax:		true,
					reply_date:			'2014-05-01',
					consult_person:		'四爷',
					reply_person:		'李小帅',
					translate_person:	'苏小美',

					meeting_address:	'一环紫禁城，乾清宫上书房',
					meeting_people_A:	'李小帅,苏小美,喵小宝',
					meeting_people_B:	'四爷,八爷,十四爷',
					consult_context:	'清初三藩势力几及全国之半，形同割据[2]。吴三桂节制云、贵两省督抚，得顺治允，可自授除文武官员，战马优先挑选，号为“西选”，“西选之官遍天下”“天下财赋，半耗于三藩。”[3]。平西藩一年消耗军饷数百万两，财政收支中央授权调配，仍占清朝年赋税支出三分之一[4]。有垄断盐井、铜矿之利，所铸之钱时称“西钱”。平西藩经清廷授意，有通使达赖喇嘛之责，保互市茶、马之业，“广征关市、榷税、盐井、金矿、铜山之利，厚自封殖”[5]。部下将士多李自成、张献忠余部，勇健善斗，“日练兵马，利器械”[6]。其余两藩也享特许，得以在地方专权，耿精忠“以税敛暴于闽”，纵容部下“苛派夫役，勒索银米”，妄称“火耳者，耿也。天下有故，据八闽以图进取，可以得志”。尚可喜，纵容属下经营盐商，“每岁所获银两不下数百万”，将兵权转交其子尚之信，罔利恣行，官民怨恨。清初财赋可谓半耗费于三藩。康熙帝亲政后，知前代藩镇之得失，曾说：“朕听政以来，以三藩及河务、漕运为三大事，夙夜廑念，曾书而悬之宫中柱上。”[7]',
					reply_context:		'康熙十七年（1678年），吴三桂在衡州（今湖南衡阳）称帝，国号“大周”，改元“昭武”，大封百官诸将。当年八月十七日秋，吴三桂病死，马宝等迎其孙吴世璠继承帝位，改元洪化，扶柩返回云南。清大将军察尼趁吴军军心不稳攻击岳州（今湖南岳阳），“岳州为湖南咽喉要地，必此地恢复，则长沙、荆州之兵始能前进”。康熙十八年正月，清兵攻岳州，局势急转直下，连克常德、衡州等地。吴军退据武岗、辰龙关（湖南沅陵官庄镇境内）。三月间，勒尔锦部至辰龙关附近，但见群山林立，林深路险，[9]不敢进兵，“急行退还”，圣祖对勒尔锦给予严厉申斥。[10]。八月，岳乐、喇布等攻破武岗，十九年三月攻破辰龙关。大将军安亲王岳乐攻克湖南长沙，大将军简亲王喇布收复衡州，傅宏烈等部收复桂林，陕甘清军收复汉中、重庆、成都。康熙十九年（1680年）十月，吴世璠退回昆明。至此湘、蜀、黔、桂等省被清军次第收复。熙十九年（1680年）三月赵良栋建议自湖南、广西、四川三路合击，进取云贵。康熙二十年（1681年），云贵总督蔡毓荣主攻，统合定远平寇大将军彰泰、赖塔等从蜀、黔、桂三路入云南，占五华山，围昆明，至十月，城内粮食不继，文武大臣纷纷投降。十月赵良栋指挥所部绿营兵率先攻破昆明，余众将从攻涌入，二十八日吴世璠绝望自杀，十月二十九日吴军出城投降。[11]王屏藩和陈君极自缢死。被俘的吴之茂、韩晋卿、张起龙等解送北京。[12]至此历时八年，蔓延十省的三藩之乱才平定下来。三藩之乱的平定，稳固了满清政局。此后攻取明郑的思明州（厦门），使前明故土完全纳入清廷的掌控，以及往后康雍乾三帝疆域的拓展，“康雍乾盛世”也由此开端。',
					law_context:		'清史馆内设有“功课簿”，记载馆员分工事宜，如柯劭忞撰〈天文志〉、〈时宪志〉。缪荃孙撰〈儒林传〉、〈文苑传〉、〈土司传〉。吴廷燮撰高宗、仁宗、宣宗、文宗、穆宗五朝〈本纪〉、〈大臣年表〉。吴士鉴撰〈地理志〉贵州、新疆各一卷、〈宗室世系表〉、〈公主表〉、〈皇子世表〉及〈艺文志〉初稿。章钰撰〈忠义传〉、〈艺文志〉定稿。金兆蕃撰太祖、太宗、顺治三朝列传及〈列女传〉。秦树声撰〈地理志〉直隶卷，王大钧撰嘉庆朝列传。夏孙桐撰嘉庆、道光朝列传及〈循吏传〉、〈艺术传〉。田应璜撰〈地理志〉山西一卷。罗惇曧撰〈交通志〉，戴锡章撰〈邦交志〉。唐邦治撰〈军机大臣年表〉。王树楠撰咸丰、同治朝大臣传。叶尔恺撰〈宗教志〉，其中喇嘛教、基督教、回教各一卷。张采田撰〈地理志〉江苏卷、〈刑法志〉、〈乐志〉、〈后妃传〉。吴怀清撰〈地理志〉陕西一卷、〈食货志〉征榷卷。张书云撰〈礼志〉，补辑（舆服志）、〈选举志〉。俞陛云撰〈兵志〉与部分列传。马其昶撰光宣朝臣工列传，修正〈文苑传〉。蓝钰撰〈地理志〉云南一卷。朱师辙有言：“列传撰人甚多，在馆诸人，几人人皆有。以余论，虽以咸同列传为主，而康乾以来各朝，皆曾补撰。盖每朝皆出于众手，惟每朝有主体撰人；又重修整时，归何人为主，则其负责为多。”[4]',

					prop_internal:		true,
					prop_external:		false

				}
			).success(function (reply) {
					task.setReplySheet()
					deferred.resolve(task);
				})

		});

	/*
	 {
	 topic: '小明的足球',
	 status: 450,
	 description: '测试数据'
	 }
	 */

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