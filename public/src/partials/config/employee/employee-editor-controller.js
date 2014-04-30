/**
 * Created by Bli on 2014/4/29.
 */
angular.module('employee-editor', [])
	.controller('employeeEditorController', ['$scope', function($scope){
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
