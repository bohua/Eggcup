/**
 * Created by Bli on 2014/4/29.
 */
angular.module('register-editor', ['handling-method-service', 'toggle-button-model'])
	.controller('registerEditorController', [
		'$scope',
		'handlingMethodService',
		function ($scope, handlingMethodService) {
			$scope.handlingList = handlingMethodService.getHandlingList();
	}]);
