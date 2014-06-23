/**
 * Created by Bli on 2014/6/16.
 */
angular.module('reply-section', ['reply-editor', 'attach-editor'])
	.controller('replySectionController', [
		'$scope',
		'$timeout',
		function ($scope, $timeout) {

			/**
			 * Reply Editor Initialization
			 */
			$scope.replyEditorConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/reply-editor/reply-editor-view.tpl.html'
			};

			$scope.showReplyEditor = function ($event) {
				$scope.task_model.replySheet.handling = $scope.task_model.handling;
				$scope.task_model.replySheet.customer_contact = $scope.task_model.customer_contact;
				$scope.task_model.replySheet.inherit_consult_context = $scope.task_model.register_content;
				$($event.currentTarget).trigger('popup', ['edit', $scope.task_model.replySheet]);
			};

			$scope.onReplySaved = function (action, data) {
				$scope.task_model.replySheet = data;
				var o = {
					id: $scope.task_model.id,
					replySheet: data
				}
				$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
			}


			$scope.$on('newArrange', function () {
				$timeout(function () {
					$scope.task_model.replySheet.handling = $scope.task_model.handling;
					$scope.task_model.replySheet.customer_contact = $scope.task_model.customer_contact;
					$('[dialog-config="replyEditorConfig"]').trigger('popup', ['new', $scope.task_model.replySheet]);
				});

			});

			/**
			 * Attachment Editor Initialization
			 */
			$scope.attachEditorConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/attach-editor/attach-editor-view.tpl.html',
				onShow: function () {

				}
			};

			$scope.showAttachEditor = function ($event, dataModel) {
				var mode = $scope.canEdit ? 'edit' : 'readOnly';
				dataModel = dataModel || [];
				$($event.currentTarget).trigger('popup', [mode, dataModel]);
			};

			$scope.getAttachModel = function () {
				return $scope.task_model.replySheet.attachment;
			}

			$scope.onAttachSaved = function (action, data) {
				$scope.task_model.replySheet.attachment = data;

				var o = {
					id: $scope.task_model.id,
					replySheet: {
						id: $scope.task_model.replySheet.id,
						attachment: data
					}
				}
				$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
			}
		}]);
