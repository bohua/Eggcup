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

			}
		}]);
