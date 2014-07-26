/**
 * Created by Bli on 2014/6/12.
 */
angular.module('appointment-detail-editor', [])
	.controller('appointmentDetailEditorController', [
		'$scope',
		'$timeout',
		function ($scope, $timeout) {
			$scope.prop.paging = 0;

			$scope.tableHandlerOption = {
				hasFileUploader: false,
				hasCreateBtn: false,
				hasOpenBtn: true,
				hasDeleteBtn: $scope.prop.mode === 'edit',

				onActivate: function (scope) {
					var selection = scope.getSelectedData();

					if (selection) {
						$scope.sheetDetail = selection;
						$scope.prop.paging = 1;
					}
				}
			};

			$scope.Back = function () {
				$scope.prop.paging = 0;
			}

			$timeout(function () {
				var client = new ZeroClipboard($(".copy-button"));

				client.on("copy", function (event) {
					var clipboard = event.clipboardData;
					clipboard.setData("text/html", $('#appointment-preview-table').html());

					alert('已复制到剪贴板！');
				});
			});
		}]);
