/**
 * Created by Bli on 2014/4/29.
 */
angular.module('arrange-editor', ['toggle-button-model', 'pop-confirm', 'employee-list-service', 'handling-method-service'])
	.controller('arrangeEditorController', [
		'$scope',
		'employeeListService',
		'handlingMethodService',
		function ($scope, employeeListService, handlingMethodService) {

			$scope.handlingList = handlingMethodService.getHandlingList();

			$scope.employeeFieldOptions = {
				source: _.pluck(employeeListService.getEmployeeList(), 'name')
			}
		}]);
