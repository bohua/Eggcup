/**
 * Created by bli on 2014/5/26.
 */
angular.module('attachment-manager', [])
	.directive('attachmentManager',[ function () {
		var Dialog = {
			restrict: 'E',
			scope: {
				dataList: "=",
				emitUploaded : '&onUploaded',
				emitDeleted : '&onDeleted'
			},
			templateUrl: 'attachment-manager.tpl.html',
			link: function ($scope, $element, $attributes) {

				$scope.Upload = function(file){

					$scope.emitUploaded({action: action, data: $scope.dialog_data_model});
				};

				$scope.Download = function(){
				};

				$scope.Delete = function(){
					$scope.emitDeleted();
				};
			}
		};

		return Dialog;
	}]);