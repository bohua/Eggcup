/**
 * Created by Bohua on 2014-06-29.
 */
angular.module('personal-settings', ['toggle-button-model', 'pop-confirm', 'login-session-service'])
	.controller('personalSettingsController', [
		'$scope',
		'$timeout',
		'loginSessionService',
		function ($scope, $timeout, loginSessionService) {
			$scope.translateLevel = function(level){
				switch(level){
					case 'external': {
						return '外部人员 (仅可阅读有限数据)';
					}
					case 'internal': {
						return '内部人员 (可阅读并操作有限读数据)';
					}
					case 'admin': {
						return '管理员 (可阅读并操作所有数据)';
					}
				}
			};

			$scope.passwordVerify = '';

			$scope.SubmitForm = function (action, validate) {
				var $el = $('#personal-settings-form').find(':input[type="password"]');
				if ($scope.dialog_data_model.login.password !== $scope.passwordVerify) {
					$el.addClass('ng-invalid');
					$scope.errorMessage = "确认密码不一至，请重试！";
				} else {
					$el.removeClass('ng-invalid');
					$scope.errorMessage = "";
				}

				$scope.Confirm(action, validate);
			};
		}]);