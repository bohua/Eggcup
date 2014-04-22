/**
 * Created by Bli on 2014/4/16.
 */

angular.module('family-member-frame', [])
	.controller('family-member-frame-controller', [
		'$scope',
		function ($scope) {

			$scope.rsda_model.rsda_family_member = [
				{
					id: 1,
					jtcyxm: "王大头",
					ybrgx: "父",
					csrq: "1958/09/02",
					gzdw: "阿里山造车厂",
					drzw: "车间主任",
					zzmm: "党员",
					lxdh: "13987654302"
				},{
					id: 2,
					jtcyxm: "黄三娘",
					ybrgx: "母",
					csrq: "1962/01/18",
					gzdw: "天山养老护理三合一综合医疗中心下属第三分院护士中心",
					drzw: "护士长",
					zzmm: "平民",
					lxdh: "0824-76543892"
				}
			];


			$scope.familyMemberEditorConfig = {
				dialogOption: {
					overlay: true,
					shadow: true,
					flat: true,
					icon: '<i class="icon-home"></i>',
					title: '家庭成员登记',
					padding: 10,
					width: 800,
					height: 340,
					overlayClickClose: false
				},

				template: '/src/partials/rsda/family-member-frame/family-member-editor.tpl.html',

				onShow: function(_dialogWin){
					$.Metro.initInputs();
					$.Metro.initDatepickers();
					_dialogWin.find('.auto-focus').focus();
				}
			};

			$scope.addFamilyMember = function(data){
				if(data){
					$scope.rsda_model.rsda_family_member.push($.extend(true, {} , data));
				}

				//TODO: Save action here
		};

			$scope.modifyFamilyMember = function($index){
				var model = $scope.rsda_model.rsda_family_member[$index];
				if(model){
					$('popup-dialog').trigger('click', [model]);
				}

				//TODO: Save action here
			}
		}]);