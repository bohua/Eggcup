/**
 * Created by Bli on 2014/4/29.
 */
angular.module('customer-editor', [])
	.controller('customerDetailController', ['$scope', function($scope){
		$scope.employee_list = $scope.dialogConfig.api.getEmployeeList();

		$scope.clear = function(model){
			$scope.dialog_data_model[model] = '';
		};
	}]);
