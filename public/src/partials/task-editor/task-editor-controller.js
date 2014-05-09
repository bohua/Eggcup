/**
 * Created by Bli on 2014/4/29.
 */
angular.module('task-editor', ['tag-reference-service', 'customer-list-service', 'employee-list-service'])
	.controller('taskEditorController', [
		'$scope',
		'tagReferenceService',
		'customerListService',
		'employeeListService',
		function ($scope, tagReferenceService, customerListService, employeeListService) {

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
		}]);
