/**
 * Created by Bli on 2014/4/29.
 */
angular.module('customer-editor', ['tag-reference-service'])
	.controller('customerEditorController', ['$scope', 'tagReferenceService', function($scope, tagReferenceService){
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

		/**
		 * Get system tags
		 */
		var sysTag = tagReferenceService.getSysTag();
	}]);
