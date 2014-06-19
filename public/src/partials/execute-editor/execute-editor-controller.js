/**
 * Created by Bli on 2014/4/29.
 */
angular.module('execute-editor', ['toggle-button-model', 'pop-confirm', 'employee-list-service'])
	.controller('executeEditorController', [
		'$scope',
		'employeeListService',
		function ($scope, employeeListService) {
			$scope.employeeFieldOptions = {
				source: _.pluck(employeeListService.getEmployeeList(), 'name')
			}
		}]);
