/**
 * Created by bli on 2014/6/9.
 */
angular.module('proposal-section', ['proposal-editor', 'attach-editor'])
	.controller('proposalSectionController', ['$scope', function ($scope) {
		$scope.proposalEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/proposal-editor/proposal-editor-view.tpl.html'
		};

		$scope.showProposalEditor = function($event, dataModel){
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getProposalModel = function(){
			return $scope.task_model.proposalSheet;
		}

		/**
		 * Attachment Editor Initialization
		 */
		$scope.attachEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/attach-editor/attach-editor-view.tpl.html',
			onShow: function(){

			}
		};

		$scope.showAttachEditor = function($event, dataModel){
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getAttachModel = function(){
			return $scope.task_model.proposalSheet.attachment;
		}

	}]);
