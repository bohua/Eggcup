/**
 * Created by bli on 14-3-13.
 */
angular.module('app', [
	//'ui.bootstrap',
	'tag-reference-service',
	'task-status-service',
	'customer-list-service',
	'employee-list-service',
	'platform',
	'zxdj-view',
	'customer-list',
	'employee-list',
	'dashboard'
]).controller('appController', [
	'$scope',
	'$rootScope',
	'$timeout',
	'$location',
	'tagReferenceService',
	'taskStatusService',
	'customerListService',
	'employeeListService',
	function ($scope, $rootScope, $timeout, $location, tagReferenceService, taskStatusService, customerListService, employeeListService) {

		/*
		 if ($location.path() !== '/') {
		 $location.path('/');
		 }
		 */

		$scope.$on('$routeChangeSuccess', function () {
			$rootScope.$broadcast('toggleLeftMenu', false);
		});

		/**
		 * Initialize global services
		 */
		tagReferenceService.init();
		taskStatusService.init();
		customerListService.init();
		employeeListService.init();

		/**
		 * Global configuration
		 */
		$(document).on('contextmenu', function (e) {
			e.preventDefault();
		})
	}]);