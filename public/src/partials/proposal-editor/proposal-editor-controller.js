/**
 * Created by Bli on 2014/4/29.
 */
angular.module('proposal-editor', ['toggle-button-model', 'pop-confirm', 'employee-list-service'])
	.controller('proposalEditorController', [
		'$scope',
		'employeeListService',
		function ($scope, employeeListService) {
			$scope.employeeFieldOptions = {
				source: _.pluck(employeeListService.getEmployeeList(), 'name')
			}
		}]);
