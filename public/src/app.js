/**
 * Created by bli on 14-3-13.
 */
angular.module('app', [
	'tag-reference-service',
	'task-status-service',
	'customer-list-service',
	'employee-list-service',
	'handling-method-service',
	'platform',
	'customer-list',
	'employee-list',
	'dashboard',
	'task-editor',
	'duScroll',
	'token-field',
	'auto-complete-field'
]).controller('appController', [
	'$scope',
	'$rootScope',
	'$timeout',
	'$location',
	'tagReferenceService',
	'taskStatusService',
	'customerListService',
	'employeeListService',
	'handlingMethodService',
	function ($scope, $rootScope, $timeout, $location, tagReferenceService, taskStatusService, customerListService, employeeListService, handlingMethodService) {

		/*
		 if ($location.path() !== '/') {
		 $location.path('/');
		 }
		 */

		/*
		//var path
		$scope.$on('$routeChangeSuccess', function () {
			topBarService.trackNavBlock($location.path());
		});
		*/

		/**
		 * Initialize global services
		 */
		tagReferenceService.init();
		taskStatusService.init();
		customerListService.init();
		employeeListService.init();
		handlingMethodService.init();

		/**
		 * Global configuration
		 */
		$(document).on('contextmenu', function (e) {
			e.preventDefault();
		})
	}]);