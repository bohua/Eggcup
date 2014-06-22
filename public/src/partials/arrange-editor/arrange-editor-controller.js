/**
 * Created by Bli on 2014/4/29.
 */
angular.module('arrange-editor', ['toggle-button-model', 'pop-confirm', 'employee-list-service', 'login-session-service'])
	.controller('arrangeEditorController', [
		'$scope',
		'employeeListService',
		'loginSessionService',
		function ($scope, employeeListService, loginSessionService) {

			$scope.employeeFieldOptions = {
				source: _.pluck(employeeListService.getEmployeeList(), 'name')
			}

			$scope.assigneeFieldOptions = {
				autocomplete: {
					source: _.pluck(employeeListService.getEmployeeList(), 'name')
				}
			}

			$scope.dialog_data_model.arrangement_assignee = $scope.dialog_data_model.arrangement_assignee || $scope.dialog_data_model.inheritAssignee;
			$scope.dialog_data_model.arrangement_date = $scope.dialog_data_model.arrangement_date || new Date();
			$scope.dialog_data_model.arrangement_assigner = $scope.dialog_data_model.arrangement_assigner || loginSessionService.getLoginUser().name;
		}]);
