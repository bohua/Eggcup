/**
 * Created by Bli on 2014/6/16.
 */
angular.module('arrange-section', ['arrange-editor', 'handling-method-service'])
	.controller('arrangeSectionController', [
		'$scope',
		'handlingMethodService',
		function ($scope, handlingMethodService) {
			$scope.arrangeEditorConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/arrange-editor/arrange-editor-view.tpl.html'
			};

			$scope.showArrangeEditor = function ($event, dataModel) {
				dataModel.handling = $scope.task_model.handling;
				$($event.currentTarget).trigger('popup', ['edit', dataModel]);
			};

			$scope.translateHandling = handlingMethodService.translateHandling;

			$scope.onArrangeSaved = function (action, data) {
				$scope.task_model.arrangeSheet = data;
				$scope.task_model.handling = data.handling;
				var o = {
					id: $scope.task_model.id,
					handling: $scope.task_model.handling,
					arrangeSheet: data
				}
				$scope.$emit('saveTaskModel', $scope.task_model.id, o);
			}
		}]);
