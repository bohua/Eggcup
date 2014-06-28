/**
 * Created by Bohua on 2014-06-18.
 */
angular.module('reply-editor', ['toggle-button-model', 'pop-confirm', 'employee-list-service', 'login-session-service'])
	.controller('replyEditorController', [
		'$scope',
		'employeeListService',
		'loginSessionService',
		function ($scope, employeeListService, loginSessionService) {

			$scope.employeeFieldOptions = {
				source: _.pluck(employeeListService.getEmployeeList(), 'name')
			};

			$scope.assigneeListOptions = {
				autocomplete: {
					source: _.pluck(employeeListService.getEmployeeList(), 'name')
				}
			};

			var source = [];
			if ($scope.dialog_data_model.customer_contact) {
				source = [$scope.dialog_data_model.customer_contact];
			}
			$scope.customerListOptions = {
				autocomplete: {
					source: source
				}
			};


			$scope.dialog_data_model.consult_context = $scope.dialog_data_model.consult_context || $scope.dialog_data_model.inherit_consult_context;
		}]);
