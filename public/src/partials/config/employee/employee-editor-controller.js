/**
 * Created by Bli on 2014/4/29.
 */
angular.module('employee-editor', [])
	.controller('employeeEditorController', ['$scope', 'tagReferenceService', function ($scope) {
		/**
		 * Initialize Emitters
		 */
		$scope.passwordVerify = '';

		$scope.deleteEmployee = function () {
			var confirmResult = confirm('确认删除么？');
			if (confirmResult === true) {
				$scope.Confirm('remove', false);
			}
		};

		$scope.SubmitForm = function (action, validate) {
			var $el = $('#employee-editor-form').find(':input[type="password"]');
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
