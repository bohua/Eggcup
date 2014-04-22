/**
 * Created by Bli on 2014/4/4.
 */
angular.module('rsda-xzjl-view', [
	'ngRoute',
	'keyboard-support',
	'rsda-resource',
	'family-member-frame'
]).config(['$routeProvider', function ($routeProvider) {
		$routeProvider.
			when('/rsda/xzjl', {templateUrl: '/src/partials/rsda/xzjl-view/rsda-xzjl-view.tpl.html', controller: 'rsdaXzjlViewController'});
	}])
	.controller('rsdaXzjlViewController', [
		'$scope',
		'$http',
		'$timeout',
		'RSDA',
		function ($scope, $http, $timeout, RSDA) {

			$.Metro.initTabs();
			$.Metro.initInputs();
			//$.Metro.initDatepickers();

			var today = new Date();
			today = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
			$('#rsda-xzjl-form [data-role=datepicker]').datepicker({
				date: today, // set init date
				format: "yyyy/mm/dd", // set output format
				effect: "none", // none, slide, fade
				position: "bottom", // top or bottom
				locale: 'zhCN',
				weekStart: -1,
				selected: function (date) {
					var el = $(this).get(0)._calendar.parent().find('input')
					var model = el.attr('ng-model').split('.')[1];

					if (model) {
						$scope.rsda_model[model] = date;
					}
					$scope.$apply();

					el.focus();
				}
			});

			/*
			 $timeout(function () {
			 $('#rsda-xzjl-form [data-role=datepicker] input').each(function (k, v) {
			 var model = $(v).attr('ng-model').split('.')[1];
			 $(v).val(today);
			 $scope.rsda_model[model] = today;
			 $scope.$apply();
			 });
			 }, 1);
			 */
			$scope.rsda_model = {};
			$scope.rsda_model.rsda_social_security = {};
			$scope.rsda_model.rsda_first_birth = {};
			$scope.rsda_model.rsda_first_birth.rsda_first_birth_children = [];


			$scope.expandableSection = {
				//基本资料
				showPersonalInfoSection: true,
				showCareerInfoSection: true,
				showContactInfoSection: true,
				showSalaryInfoSection: true,

				//扩充资料
				showSocialInsuranceSection: true,
				showBusinessInsuranceSection: true,
				showAdditionalFundationsSection: true,
				showContactPersonAndFunderSection: true,
				showBirthStrategySection: true,

				//家庭成员
				showFamilyMembersSection: true
			}


			$scope.save = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				var rsda = new RSDA($scope.rsda_model);
				rsda.$save();
			};
		}]);