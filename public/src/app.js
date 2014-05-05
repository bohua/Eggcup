/**
 * Created by bli on 14-3-13.
 */
angular.module('app', [
	'tag-reference-service',
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
	function ($scope, $rootScope, $timeout, $location, tagReferenceService) {

		/*
		 if ($location.path() !== '/') {
		 $location.path('/');
		 }
		 */

		/**
		 * Initialize global services
		 */
		tagReferenceService.init();
	}]);