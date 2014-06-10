/**
 * Created by Bli on 2014/4/29.
 */
angular.module('register-editor', ['handling-method-service', 'toggle-button-model', 'pop-confirm'])
	.controller('registerEditorController', [
		'$scope',
		'handlingMethodService',
		function ($scope, handlingMethodService) {
			$scope.handlingList = handlingMethodService.getHandlingList();

			$scope.popConfirmOptions = {
				onConfirm: function(){
					console.log('empty');
				}
			};

	}]);
