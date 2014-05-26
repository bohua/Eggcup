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
			templateUrl: '/src/global-directives/attachment-manager-directive/attachment-manager.tpl.html',
			link: function ($scope, $element, $attributes) {
				$.Metro.initInputs($element);

				$scope.UploadFile = function(file){

					$scope.emitUploaded({action: action, data: $scope.dialog_data_model});
				};

				$scope.DownloadFile = function(){
				};

				$scope.DeleteFile = function(){
					$scope.emitDeleted();
				};
			}
		};

		return Dialog;
	}]);