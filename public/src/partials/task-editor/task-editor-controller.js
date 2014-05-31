/**
 * Created by Bli on 2014/4/29.
 */
angular.module('task-editor', [
	'ngRoute',
	'keyboard-support',
	'tag-reference-service',
	'customer-list-service',
	'employee-list-service',
	'task-status-service',

	//No return value
	'price-tab-controller'

]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/task-editor/:action/:taskId', {
			templateUrl: '/src/partials/task-editor/task-editor-view.tpl.html',
			controller: 'taskEditorController',
			resolve: {
				model: function ($route, TASK) {
					return TASK.get({task_id: $route.current.params.taskId}).$promise;
				}
			}
		})
}]).controller('taskEditorController', [
	'$routeParams',
	'$location',
	'$scope',
	'$timeout',
	'tagReferenceService',
	'customerListService',
	'employeeListService',
	'taskStatusService',
	'model',
	function ($routeParams, $location, $scope, $timeout, tagReferenceService, customerListService, employeeListService, taskStatusService, model) {

		/**
		 * Initialize Emitters
		 */
		$scope.delete = function () {
			var confirmResult = confirm('确认删除么？');
			if (confirmResult === true) {
				$scope.Confirm('remove', false);
			}
		}

		/**
		 * Initialize default values & functions
		 */
		$scope.showViewHeader = true;
		$scope.showDialogFooter = false;
		$scope.prop = {};
		$scope.prop.showErrorMessage = false;
		//$scope.prop._parentApi = $scope.dialogConfig.api;
		$scope.prop.mode = $routeParams.action;

		$scope.dialog_data_model = model;
		if ($scope.prop.mode === 'new') {
			$scope.dialog_data_model.status = 100;
		}

		/**
		 * view handlers binding
		 */
		$scope.employeeList = employeeListService.getEmployeeList();
		$scope.customerList = customerListService.getCustomerList();
		$scope.translateCustomer = customerListService.translateCustomer;
		$scope.translateEmployee = employeeListService.translateEmployee;
		$scope.translateStatus = taskStatusService.translateStatus;

		//Get possible precedence status
		$scope.statusStack = taskStatusService.getPrecedence($scope.dialog_data_model.status);

		//Set backward button action
		$scope.getBack = function () {
			$location.path('/');
		}

		/**
		 * Tmp
		 */
		$scope.address_type = 0;

	}]);
