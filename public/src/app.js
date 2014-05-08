/**
 * Created by bli on 14-3-13.
 */
angular.module('app', [
	'tag-reference-service',
	'task-status-service',
	'customer-list-service',
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
	function ($scope, $rootScope, $timeout, $location, tagReferenceService, taskStatusService, customerListService) {

		/*
		 if ($location.path() !== '/') {
		 $location.path('/');
		 }
		 */

		/**
		 * Initialize global services
		 */
		tagReferenceService.init();
		taskStatusService.init();
		customerListService.init();
	}]);