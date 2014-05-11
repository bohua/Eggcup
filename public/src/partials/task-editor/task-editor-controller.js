/**
 * Created by Bli on 2014/4/29.
 */
angular.module('task-editor', ['tag-reference-service', 'customer-list-service', 'employee-list-service', 'task-status-service'])
	.controller('taskEditorController', [
		'$scope',
		'tagReferenceService',
		'customerListService',
		'employeeListService',
		'taskStatusService',
		function ($scope, tagReferenceService, customerListService, employeeListService, taskStatusService) {

			/**
			 * Initialize Emitters
			 */
			$scope.delete = function () {
				var confirmResult = confirm('确认删除么？');
				if (confirmResult === true) {
					$scope.Confirm('remove', false);
				}
			}

			$scope.employeeList = employeeListService.getEmployeeList();
			$scope.customerList = customerListService.getCustomerList();

			$scope.translateCustomer = customerListService.translateCustomer;

			var statusCode = $scope.dialog_data_model.status;
			var statusStack = taskStatusService.getPrecedence(statusCode).slice();
			statusStack.unshift({
					action: taskStatusService.translateStatus(statusCode),
					nextStatus: statusCode
				});
			$scope.statusStack = statusStack;
		}]);
