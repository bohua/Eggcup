/**
 * Created by bli on 14-3-13.
 */
angular.module('app', [
	'sign-in',
	'login-session-service',
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
	'auto-complete-field',
	'date-field-model',
	'editable-table',
	'table-content-handler'
]).controller('appController', [
	'$scope',
	'$rootScope',
	'$timeout',
	'$location',
	'loginSessionService',
	'taskStatusService',
	'customerListService',
	'employeeListService',
	'handlingMethodService',
	function ($scope, $rootScope, $timeout, $location, loginSessionService, taskStatusService, customerListService, employeeListService, handlingMethodService) {

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
		loginSessionService.init();
		taskStatusService.init();
		customerListService.init();
		employeeListService.init();
		handlingMethodService.init();


		/**
		 * Global configuration
		 */
		$(document).on('contextmenu', function (e) {
			e.preventDefault();
		});

		$scope.$on('loginSuccess', function () {
			$('#top-bar').show();
			$('#right-stage').show();

			$timeout(function(){
				$('#top-bar').css('opacity', 1);
				$('#right-stage').css('opacity', 1);

			},100);
		});
	}]);