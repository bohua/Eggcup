/**
 * Created by Bli on 2014/4/29.
 */
angular.module('customer-editor', ['employee-list-service'])
	.controller('customerEditorController', ['$scope', 'employeeListService', function($scope, employeeListService){
		/**
		 * Initialize References
		 */
		$scope.employee_list = employeeListService.getEmployeeList();

		/**
		 * Initialize Emitters
		 */
		$scope.delete = function(){
			var confirmResult = confirm('确认删除么？');
			if(confirmResult === true){
				$scope.Confirm('remove', false);
			}
		}

		/**
		 * Get system tags
		 */
		//var sysTag = tagReferenceService.getSysTag();
	}]);
