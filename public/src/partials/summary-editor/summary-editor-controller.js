/**
 * Created by Bli on 2014/4/29.
 */
angular.module('summary-editor', ['toggle-button-model', 'pop-confirm', 'employee-list-service'])
	.controller('summaryEditorController', [
		'$scope',
		'employeeListService',
		function ($scope, employeeListService) {
			$scope.employeeFieldOptions = {
				source: _.pluck(employeeListService.getEmployeeList(), 'name')
			}
		}]);
