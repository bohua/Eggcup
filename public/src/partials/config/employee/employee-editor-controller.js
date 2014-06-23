/**
 * Created by Bli on 2014/4/29.
 */
angular.module('employee-editor', ['tag-reference-service'])
	.controller('employeeEditorController', ['$scope', 'tagReferenceService', function ($scope, tagReferenceService) {
		/**
		 * Initialize Emitters
		 */
		$scope.delete = function () {
			var confirmResult = confirm('确认删除么？');
			if (confirmResult === true) {
				$scope.Confirm('remove', false);
			}
		};

		$scope.SubmitForm = function (action, validate) {
			if ($scope.dialog_data_model.login.password !== $scope.passwordVerify){
				$('#employee-editor-form :input[type="password"]').addClass('ng-invalid');
				$scope.errorMessage = "确认密码不一至，请重试！";
			}else{
				$('#employee-editor-form :input[type="password"]').removeClass('ng-invalid');
				$scope.errorMessage = "";
			}

			$scope.Confirm(action, validate);
		}
		//, ng-class="{'ng-invalid': dialog_data_model.login.password!=passwordVerify}",

		/**
		 * Get system tags
		 */
		/*
		 var sysTag = tagReferenceService.getSysTag();

		 var tmpId = 1;
		 $scope.tagGenerator = function (newTagValue) {
		 return newTag = tagReferenceService
		 .createTag({
		 tag: newTagValue
		 });

		 }

		 $scope.getTagClass = function (tag) {
		 switch (tag.type) {
		 case 'config':
		 return 'label bg-grayDark';
		 case 'custom':
		 return 'label bg-darkBlue';
		 case 'permit':
		 return 'label bg-darkRed';
		 default :
		 return 'label bg-darkBlue';
		 }
		 }
		 */
	}]);
