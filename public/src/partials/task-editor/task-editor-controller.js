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
				task_model: function ($route, TASK) {
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
	'task_model',
	function ($routeParams, $location, $scope, $timeout, tagReferenceService, customerListService, employeeListService, taskStatusService, task_model) {

		/**
		 * Initialize default values & functions
		 */
		$scope.task_model = task_model;

		/**
		 * view handlers binding
		 */
		$scope.employeeList = employeeListService.getEmployeeList();
		$scope.customerList = customerListService.getCustomerList();
		$scope.translateCustomer = customerListService.translateCustomer;
		$scope.translateEmployee = employeeListService.translateEmployee;
		$scope.translateStatus = taskStatusService.translateStatus;

		//Get possible precedence status
		$scope.statusStack = taskStatusService.getPrecedence($scope.task_model.status);

		$scope.progressList = [];
		(function(status){
			//TODO: finish progress list logic
		})($scope.task_model.status);

		/**
		 * Initialize Emitters
		 */
		$scope.delete = function () {
			var confirmResult = confirm('确认删除么？');
			if (confirmResult === true) {
				$scope.Confirm('remove', false);
			}
		}

		$scope.closeToggle = function(){
			$('li.dropdown.open').removeClass('open');
		};

		//Set backward button action
		$scope.getBack = function () {
			$location.path('/');
		}
	}]);
