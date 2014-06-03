/**
 * Created by Bohua on 2014-06-01.
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

			buildTestCases();
		}
	});


function buildTestCases() {
	task_bo.save(task_json);
}

var task_json = {
	id: 1005,
	slogan: '平三藩',
	description: '朝廷咨询案例，测试用例',
	status: 450,
	report_date: '2014-05-01',
	reporter: '李小帅',
	assignee: '苏小美, 喵小宝',
	tags: '重要, 测试, 朝廷',
	handling: 1,
	register_topic: '朝廷咨询 2014-05-05',
	register_content: '康熙六年（1667年），吴三桂以目疾请解除总管云贵两行省事务，康熙帝批准，责令云贵两省督抚管理。康熙十二年（1673年）三月，平南王尚可喜疏请归老辽东，由其子尚之信继续镇守广东，清廷以尚之信跋扈难制，令尚之信撤藩。吴三桂和耿精忠于是年七月先后疏请撤兵，以试探朝廷动静，这时朝中对于三藩的处置分成两派，索额图、图海等以为三藩不可动，户部尚书米思翰、兵部尚书明珠则赞成撤藩。康熙帝说：“三桂等蓄谋久，不早除之，将养痈成患。今日撤亦反，不撤亦反，不若先发。”[8]康熙遂下令三藩俱撤还山海关外。',
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
	prop_external: false,

	arrangeSheet: {
		start_date: '2014-05-06',
		end_date: '2014-06-20',

		arrangement_comment: '朝廷大事，理当全部出马！',
		arrangement_date: '2014-05-06',
		arrangement_assignee: '李小帅,苏小美,喵小宝',
		arrangement_assigner: '剧情隐藏之大BOSS',

		prop_internal: true,
		prop_external: false
	},

	replySheet: {
		reply_withEmail: true,
		reply_withTel: true,
		reply_withF2F: true,
		reply_withFax: true,
		reply_date: '2014-05-01',
		consult_person: '四爷',
		reply_person: '李小帅',
		translate_person: '苏小美',

		meeting_address: '一环紫禁城，乾清宫上书房',
		meeting_people_A: '李小帅,苏小美,喵小宝',
		meeting_people_B: '四爷,八爷,十四爷',
		consult_context: '清初三藩势力几及全国之半，形同割据[2]。吴三桂节制云、贵两省督抚，得顺治允，可自授除文武官员，战马优先挑选，号为“西选”，“西选之官遍天下”“天下财赋，半耗于三藩。”[3]。平西藩一年消耗军饷数百万两，财政收支中央授权调配，仍占清朝年赋税支出三分之一[4]。有垄断盐井、铜矿之利，所铸之钱时称“西钱”。平西藩经清廷授意，有通使达赖喇嘛之责，保互市茶、马之业，“广征关市、榷税、盐井、金矿、铜山之利，厚自封殖”[5]。部下将士多李自成、张献忠余部，勇健善斗，“日练兵马，利器械”[6]。其余两藩也享特许，得以在地方专权，耿精忠“以税敛暴于闽”，纵容部下“苛派夫役，勒索银米”，妄称“火耳者，耿也。天下有故，据八闽以图进取，可以得志”。尚可喜，纵容属下经营盐商，“每岁所获银两不下数百万”，将兵权转交其子尚之信，罔利恣行，官民怨恨。清初财赋可谓半耗费于三藩。康熙帝亲政后，知前代藩镇之得失，曾说：“朕听政以来，以三藩及河务、漕运为三大事，夙夜廑念，曾书而悬之宫中柱上。”[7]',
		reply_context: '康熙十七年（1678年），吴三桂在衡州（今湖南衡阳）称帝，国号“大周”，改元“昭武”，大封百官诸将。当年八月十七日秋，吴三桂病死，马宝等迎其孙吴世璠继承帝位，改元洪化，扶柩返回云南。清大将军察尼趁吴军军心不稳攻击岳州（今湖南岳阳），“岳州为湖南咽喉要地，必此地恢复，则长沙、荆州之兵始能前进”。康熙十八年正月，清兵攻岳州，局势急转直下，连克常德、衡州等地。吴军退据武岗、辰龙关（湖南沅陵官庄镇境内）。三月间，勒尔锦部至辰龙关附近，但见群山林立，林深路险，[9]不敢进兵，“急行退还”，圣祖对勒尔锦给予严厉申斥。[10]。八月，岳乐、喇布等攻破武岗，十九年三月攻破辰龙关。大将军安亲王岳乐攻克湖南长沙，大将军简亲王喇布收复衡州，傅宏烈等部收复桂林，陕甘清军收复汉中、重庆、成都。康熙十九年（1680年）十月，吴世璠退回昆明。至此湘、蜀、黔、桂等省被清军次第收复。熙十九年（1680年）三月赵良栋建议自湖南、广西、四川三路合击，进取云贵。康熙二十年（1681年），云贵总督蔡毓荣主攻，统合定远平寇大将军彰泰、赖塔等从蜀、黔、桂三路入云南，占五华山，围昆明，至十月，城内粮食不继，文武大臣纷纷投降。十月赵良栋指挥所部绿营兵率先攻破昆明，余众将从攻涌入，二十八日吴世璠绝望自杀，十月二十九日吴军出城投降。[11]王屏藩和陈君极自缢死。被俘的吴之茂、韩晋卿、张起龙等解送北京。[12]至此历时八年，蔓延十省的三藩之乱才平定下来。三藩之乱的平定，稳固了满清政局。此后攻取明郑的思明州（厦门），使前明故土完全纳入清廷的掌控，以及往后康雍乾三帝疆域的拓展，“康雍乾盛世”也由此开端。',
		law_context: '清史馆内设有“功课簿”，记载馆员分工事宜，如柯劭忞撰〈天文志〉、〈时宪志〉。缪荃孙撰〈儒林传〉、〈文苑传〉、〈土司传〉。吴廷燮撰高宗、仁宗、宣宗、文宗、穆宗五朝〈本纪〉、〈大臣年表〉。吴士鉴撰〈地理志〉贵州、新疆各一卷、〈宗室世系表〉、〈公主表〉、〈皇子世表〉及〈艺文志〉初稿。章钰撰〈忠义传〉、〈艺文志〉定稿。金兆蕃撰太祖、太宗、顺治三朝列传及〈列女传〉。秦树声撰〈地理志〉直隶卷，王大钧撰嘉庆朝列传。夏孙桐撰嘉庆、道光朝列传及〈循吏传〉、〈艺术传〉。田应璜撰〈地理志〉山西一卷。罗惇曧撰〈交通志〉，戴锡章撰〈邦交志〉。唐邦治撰〈军机大臣年表〉。王树楠撰咸丰、同治朝大臣传。叶尔恺撰〈宗教志〉，其中喇嘛教、基督教、回教各一卷。张采田撰〈地理志〉江苏卷、〈刑法志〉、〈乐志〉、〈后妃传〉。吴怀清撰〈地理志〉陕西一卷、〈食货志〉征榷卷。张书云撰〈礼志〉，补辑（舆服志）、〈选举志〉。俞陛云撰〈兵志〉与部分列传。马其昶撰光宣朝臣工列传，修正〈文苑传〉。蓝钰撰〈地理志〉云南一卷。朱师辙有言：“列传撰人甚多，在馆诸人，几人人皆有。以余论，虽以咸同列传为主，而康乾以来各朝，皆曾补撰。盖每朝皆出于众手，惟每朝有主体撰人；又重修整时，归何人为主，则其负责为多。”[4]',

		prop_internal: true,
		prop_external: false,

		attachment: [
			{
				file_name: '清史.docx',
				file_ext: 'docx',
				file_size: '168309098',
				file_url: 'localhost://attachments/test/清史.docx'
			},
			{
				file_name: '鹿鼎记.pdf',
				file_ext: 'pdf',
				file_size: '68309098',
				file_url: 'localhost://attachments/test/鹿鼎记.pdf'
			}
		]
	},

	proposalSheet: {
		proposal_topic: '坐观其变',
		proposal_date: '2014-05-07',
		proposal_content: '吴三桂势孤力单，地盘日蹙，为鼓舞士气，于十七年三月在衡州（今湖南衡阳）称帝。八月病死，其孙吴世璠继位，退往贵阳。安远靖寇大将军察尼趁机以水陆军进取岳州（今湖南岳阳），攻克辰龙关；岳乐率师深入湖南，复长沙，克武冈，占沅州（今芷江）；喇布率师复衡州；同时，清将傅宏烈等部，在广东清军支援下收复桂林；陕、甘清军分路南下，收复汉中、重庆、成都。十九年十月，吴世璠再逃昆明。清军在将军赵良栋、大将军彰泰、赖塔率领下，从蜀、黔、桂三路挺进云南，二十年十月攻破昆明，吴世璠兵败自杀，残部6700余人投降。至此，延续八年之久的三藩之乱被平定。 此战，康熙帝先翦两翼，再捣腹心，剿抚兼施，逐个击破，削平三藩，加强了中央集权，维护了国家统一。',
		proposal_person: '李小帅',
		proposal_translator: '苏小美',

		price_discount: '0.00',

		prop_internal: true,
		prop_external: true,

		subItem: [
			{
				service: '出谋划策',
				date: '2014-05-07',
				expense: 20000.00,
				traffic: 2000.00,
				extra: 10000.00,

				attachment: [
					{
						file_name: '大清发票.jpg',
						file_ext: 'jpg',
						file_size: '1239098',
						file_url: 'localhost://attachments/test/大清发票.jpg'
					},
					{
						file_name: '大清发票2.jpg',
						file_ext: 'jpg',
						file_size: '1239098',
						file_url: 'localhost://attachments/test/大清发票2.jpg'
					}
				]
			},
			{
				service: '集结粮饷',
				date: '2014-05-10',
				expense: 2000000000.00,
				traffic: 2000000.00,
				extra: 10000000.00,

				attachment: [
					{
						file_name: '大清国债.npg',
						file_ext: 'npg',
						file_size: '1239098',
						file_url: 'localhost://attachments/test/大清国债.npg'
					}
				]
			}
		]

	},

	contractSheet: {
		contract_date:		'2014-05-08',
		contract_due_date:	'2014-09-30',
		contract_topic:		'先翦两翼，再捣腹心',
		contract_A:			'李小帅',
		contract_B:			'四爷',

		prop_internal:		true,
		prop_external:		true,

		subItem: [
			{
				pay_slogan:	'头款',
				pay_date:	'2014-05-10',
				expense:	20000000.00,
				due_date:	'2014-05-20',
				pay_method:	'银票',

				attachment: [
					{
						file_name: '通宝银票复印件.jpg',
						file_ext: 'jpg',
						file_size: '1239098',
						file_url: 'localhost://attachments/test/通宝银票复印件.jpg'
					}
				]
			},
			{
				pay_slogan: '发兵粮饷',
				pay_date: '2014-06-1',
				expense: 10000000.00,
				due_date:	'2014-06-30',
				pay_method:	'铜钱/银锭',

				attachment: [
					{
						file_name: '宝箱照片.jpg',
						file_ext: 'jpg',
						file_size: '1239098',
						file_url: 'localhost://attachments/test/宝箱照片.jpg'
					}
				]
			},
			{
				pay_slogan: '战后赏银',
				pay_date: '2014-08-1',
				expense: 999999999.00,
				due_date:	'2014-08-31',
				pay_method:	'自己抢',

				attachment: [
					{
						file_name: '圣旨.pdf',
						file_ext: 'pdf',
						file_size: '1239098',
						file_url: 'localhost://attachments/test/圣旨.pdf'
					}
				]
			}
		]
	},

	executeSheet: {
		project_manager:	'苏小美',
		project_runner:		'喵小宝',
		project_topic:		'朝廷谕旨',

		prop_internal:		true,
		prop_external:		true,

		subItem: [
			{
				execute_date:	'2014-05-30',
				execute_runner:	'喵小宝',
				execute_digest:	'小宝夜入敌营，刺探乱方主将与猫粮所在',

				attachment: [
					{
						file_name: '营外偷拍.jpg',
						file_ext: 'jpg',
						file_size: '1239098',
						file_url: 'localhost://attachments/test/营外偷拍.jpg'
					},
					{
						file_name: '主将军帐.jpg',
						file_ext: 'jpg',
						file_size: '1239098',
						file_url: 'localhost://attachments/test/主将军帐.jpg'
					}
					,
					{
						file_name: '偷吃咸鱼.jpg',
						file_ext: 'jpg',
						file_size: '1239098',
						file_url: 'localhost://attachments/test/偷吃咸鱼.jpg'
					}
				]
			},
			{
				execute_date:	'2014-06-30',
				execute_runner:	'苏小美',
				execute_digest:	'游说乱将，策反其部，并在关键时刻反戈',

				attachment: [
					{
						file_name: '贿赂收据.pdf',
						file_ext: 'pdf',
						file_size: '1239098',
						file_url: 'localhost://attachments/test/贿赂收据.jpg'
					}
				]
			}
		]
	},

	accountSheet: {

	}
}

