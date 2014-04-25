/**
 * Created by Bli on 2014/4/24.
 */
angular.module('zxdj-view', [
	'ngRoute',
	'keyboard-support',
	'ref-data-service',
	'task-resource'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/zxdj', {templateUrl: '/src/partials/zxdj-view/zxdj-view.tpl.html', controller: 'zxdjViewController'});
}]).controller('zxdjViewController', [
	'$scope',
	'$http',
	'$timeout',
	'$location',
	'refDataService',
	'TASK',
	function ($scope, $http, $timeout, $location, refDataService, TASK) {

		$.Metro.initTabs();
		$.Metro.initInputs();

		var today = new Date();
		today = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
		$('#zxdj-form [data-role=datepicker]').datepicker({
			date: today, // set init date
			format: "yyyy/mm/dd", // set output format
			effect: "none", // none, slide, fade
			position: "bottom", // top or bottom
			locale: 'zhCN',
			weekStart: -1,
			selected: function (date) {
				var _calendar = $(this).get(0)._calendar,
					el = _calendar.parent().find('input'),
					model = el.attr('ng-model').split('.')[1];

				_calendar.hide();

				if (model) {
					$scope.rsda_model[model] = date;
				}
				$scope.$apply();

				el.focus();
			}
		});

		/**
		 * ng-click functions
		 */
		$scope.getBack = function () {
			$location.path('/');
		};

		$scope.getAutoComplete = function () {
			console.log(refDataService.getCustomerList());
		};
	}]);