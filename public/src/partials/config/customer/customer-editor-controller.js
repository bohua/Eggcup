/**
 * Created by Bli on 2014/4/29.
 */
angular.module('customer-editor', [])
	.controller('customerEditorController', ['$scope', function($scope){
		/**
		 * Initialize References
		 */
		$scope.employee_list = $scope.dialogConfig.api.getEmployeeList();

		/**
		 * Initialize Emitters
		 */
		$scope.delete = function(){
			var confirmResult = confirm('确认删除么？');
			if(confirmResult === true){
				$scope.Confirm('remove', false);
			}
		}
	}]);