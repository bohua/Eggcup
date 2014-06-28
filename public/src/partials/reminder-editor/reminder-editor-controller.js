/**
 * Created by Bli on 2014/4/29.
 */
angular.module('reminder-editor', ['toggle-button-model', 'pop-confirm', 'login-session-service'])
	.controller('reminderEditorController', [
		'$scope',
		'$timeout',
		'loginSessionService',
		function ($scope, $timeout, loginSessionService) {
			$scope.prop.paging = 0;

			$scope.dialog_data_model.sender = loginSessionService.getLoginUser().name;

			$scope.dialog_data_model.reminder_sent = new Date();

			$scope.Generate = function () {
				$scope.sheetDetail = $scope.dialog_data_model;

				$scope.prop.paging = 1;
			};

			$scope.Back = function(){
				$scope.prop.paging = 0;
			}

			$timeout(function(){
				var client = new ZeroClipboard($(".copy-button"));

				client.on( "copy", function (event) {
					var clipboard = event.clipboardData;
					clipboard.setData( "text/html", $('#reminder-preview-table').html() );

					alert('已复制到剪贴板！');
				});
			});
		}]);
