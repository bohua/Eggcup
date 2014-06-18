/**
 * Created by Bli on 2014/6/16.
 */
angular.module('reply-section', ['reply-editor', 'handling-method-service'])
	.controller('replySectionController', [
		'$scope',
		'$timeout',
		'handlingMethodService',
		function ($scope, $timeout, handlingMethodService) {
			$scope.replyEditorConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/reply-editor/reply-editor-view.tpl.html'
			};

			$scope.showReplyEditor = function ($event) {
				$scope.task_model.replySheet.handling = $scope.task_model.handling;
				$($event.currentTarget).trigger('popup', ['edit', $scope.task_model.replySheet]);
			};

			$scope.translateHandling = handlingMethodService.translateHandling;

			$scope.onReplySaved = function (action, data) {
				$scope.task_model.replySheet = data;
				$scope.task_model.handling = data.handling;
				var o = {
					id: $scope.task_model.id,
					handling: $scope.task_model.handling,
					replySheet: data
				}
				$scope.$emit('saveTaskModel', $scope.task_model.id, o);
			}

			$scope.$on('newArrange', function(){
				$timeout(function(){
					$('[dialog-config="replyEditorConfig"]').trigger('popup', ['new', $scope.task_model.replySheet]);
				});

			});
		}]);
