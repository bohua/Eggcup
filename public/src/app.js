/**
 * Created by bli on 14-3-13.
 */
angular.module('app', [
	'ngRoute',
	'ngCookies',
	'sign-in',
	'login-session-service',
	'task-status-service',
	'customer-list-service',
	'employee-list-service',
	'task-service',
	'handling-method-service',
	'file-type-service',
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
	'taskService',
	'handlingMethodService',
	'fileTypeService',
	function ($scope, $rootScope, $timeout, $location, loginSessionService, taskStatusService, customerListService, employeeListService, taskService, handlingMethodService, fileTypeService) {
		/**
		 * Initialize global services
		 */
		loginSessionService.init();
		taskStatusService.init();
		customerListService.init();
		employeeListService.init();
		taskService.init();
		handlingMethodService.init();
		fileTypeService.init();

		$scope.hasSignIn = loginSessionService.getLoginStatus();
		if($scope.hasSignIn){
			$timeout(showDesktop, 100);
		}

		/**
		 * Global configuration
		 */
		$(document).on('contextmenu', function (e) {
			e.preventDefault();
		});

		$scope.$on('loginSuccess', function () {
			$scope.hasSignIn = loginSessionService.getLoginStatus();
			$scope.$apply();
		});


		/**
		 * Closure function
		 */
		function showDesktop() {
			$('#top-bar').css('opacity', 1);
			$('#right-stage').css('opacity', 1);
		}
	}]);