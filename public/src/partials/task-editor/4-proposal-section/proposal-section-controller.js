/**
 * Created by bli on 2014/6/9.
 */
angular.module('proposal-section', ['proposal-editor', 'attach-editor', 'detail-editor'])
	.controller('proposalSectionController', ['$scope', function ($scope) {
		/**
		 * Proposal Editor Initialization
		 */
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

		$scope.onProposalSaved = function (action, data) {
			$.extend(true, $scope.task_model.proposalSheet, data);
			$scope.$emit('saveTaskModel');
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

		$scope.onAttachSaved = function (action, data) {
			//$.extend(true, $scope.task_model.proposalSheet.attachment, data);

			$scope.task_model.proposalSheet.attachment = data;
			$scope.$emit('saveTaskModel');
		}

		/**
		 * Detail Editor Initialization
		 */
		$scope.detailEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/detail-editor/proposal-detail-editor-view.tpl.html',
			onShow: function(){

			}
		};

		$scope.showDetailEditor = function($event, dataModel){
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getDetailModel = function(){
			return $scope.task_model.proposalSheet.subItem;
		}

		$scope.onDetailSaved = function (action, data) {
			$.extend(true, $scope.task_model.proposalSheet.subItem, data);
			$scope.$emit('saveTaskModel');
		}
	}]);
