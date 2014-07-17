/**
 * Created by Bohua on 2014-06-18.
 */
angular.module('restore-dialog', ['file-upload-field'])
	.controller('restoreDialogController', [
		'$scope',
		'$http',
		function ($scope, $http) {
			$scope.canRestore = false;

			$scope.fileUploaded = function(file){
				$scope.uploadScript = file.file_url;

				$scope.canRestore = true;
				$scope.$apply();
			};

			$scope.restoreDB = function(){
				$http.post('/restore', {restore_src: $scope.uploadScript})
					.success(function (result) {
						alert('数据还原完成!');
					});
				$scope.Confirm();
			};
		}]);
