/**
 * Created by Bli on 2014/4/29.
 */
angular.module('appointment-editor', ['toggle-button-model', 'pop-confirm', 'login-session-service'])
	.controller('appointmentEditorController', [
		'$scope',
		'$timeout',
		'loginSessionService',
		function ($scope, $timeout, loginSessionService) {
			$scope.prop.paging = 0;

			$scope.sender = loginSessionService.getLoginUser().name;

			$scope.dialog_data_model.appointment_sent = new Date();

			$timeout(function () {
				var $el = $('#timer');
				$el.timepicker({
					appendWidgetTo: $el.closest('#modal-stage'),
					minuteStep: 1,
					showInputs: false,
					template: 'dropdown',
					modalBackdrop: true
				});
			});

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
					clipboard.setData( "text/html", $('#appointment-preview-table').html() );

					alert('已复制到剪贴板！');
				});
			});
		}]);
