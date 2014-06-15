/**
 * Created by bli on 2014/6/9.
 */
angular.module('register-section', ['register-editor', 'handling-method-service'])
	.controller('registerSectionController', [
		'$scope',
		'handlingMethodService',
		function ($scope, handlingMethodService) {
			$scope.registerEditorConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/register-editor/register-editor-view.tpl.html'
			};

			$scope.showRegisterEditor = function ($event, dataModel) {
				$($event.currentTarget).trigger('popup', ['edit', dataModel]);
			};

			$scope.translateHandling = handlingMethodService.translateHandling;

			$scope.onRegisterSaved = function (action, data) {
				//taskContentService.saveTask(data);
				$.extend(true, $scope.task_model, data);
				$scope.$emit('saveTaskModel');
			}
		}]);
