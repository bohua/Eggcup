/**
 * Created by Bli on 2014/4/29.
 */
angular.module('arrange-editor', ['toggle-button-model', 'pop-confirm', 'employee-list-service', 'handling-method-service', 'login-session-service'])
	.controller('arrangeEditorController', [
		'$scope',
		'employeeListService',
		'handlingMethodService',
		'loginSessionService',
		function ($scope, employeeListService, handlingMethodService, loginSessionService) {

			$scope.handlingList = handlingMethodService.getHandlingList();

			$scope.employeeFieldOptions = {
				source: _.pluck(employeeListService.getEmployeeList(), 'name')
			}

			$scope.assigneeFieldOptions = {
				autocomplete: {
					source: _.pluck(employeeListService.getEmployeeList(), 'name')
				}
			}

			/**
			 * Set default value for new
			 */
			if($scope.prop.mode === 'new'){
				$scope.dialog_data_model.arrangement_date = new Date();
				$scope.dialog_data_model.arrangement_assigner = loginSessionService.getLoginUser();
			}
		}]);
