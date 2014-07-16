/**
 * Created by bli on 2014/6/9.
 */
angular.module('proposal-section', ['proposal-editor', 'attach-editor', 'proposal-detail-editor', 'print-service'])
	.controller('proposalSectionController', ['$scope', 'printService', function ($scope, printService) {
		/**
		 * Proposal Editor Initialization
		 */
		$scope.proposalEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/proposal-editor/proposal-editor-view.tpl.html'
		};

		$scope.showProposalEditor = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getProposalModel = function () {
			return $scope.task_model.proposalSheet;
		};

		$scope.onProposalSaved = function (action, data) {
			$scope.task_model.proposalSheet = data;
			var o = {
				id: $scope.task_model.id,
				proposalSheet: data
			};
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		};

		/**
		 * Attachment Editor Initialization
		 */
		$scope.attachEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/attach-editor/attach-editor-view.tpl.html'
		};

		$scope.showAttachEditor = function ($event, dataModel) {
			var mode = $scope.canEdit ? 'edit' : 'readOnly';
			dataModel = dataModel || [];
			$($event.currentTarget).trigger('popup', [mode, dataModel]);
		};

		$scope.getAttachModel = function () {
			return $scope.task_model.proposalSheet.attachment;
		};

		$scope.onAttachSaved = function (action, data) {
			$scope.task_model.proposalSheet.attachment = data;

			var o = {
				id: $scope.task_model.id,
				proposalSheet: {
					id: $scope.task_model.proposalSheet.id,
					attachment: data
				}
			};
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		};

		/**
		 * Detail Editor Initialization
		 */
		$scope.detailEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/proposal-editor/proposal-detail-editor-view.tpl.html'
		};

		$scope.showDetailEditor = function ($event, dataModel) {
			var mode = $scope.canEdit ? 'edit' : 'readOnly';
			dataModel = dataModel || [];
			$($event.currentTarget).trigger('popup', [mode, dataModel]);
		};

		$scope.getDetailModel = function () {
			return $scope.task_model.proposalSheet.subItem;
		};

		$scope.onDetailSaved = function (action, data) {
			$scope.task_model.proposalSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				proposalSheet: {
					id: $scope.task_model.proposalSheet.id,
					subItem: data
				}
			};
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		};

		$scope.printDoc = function () {
			var privileges = [];

			if ($scope.task_model.prop_internal) privileges.push("内部浏览");
			if ($scope.task_model.prop_external) privileges.push("客户浏览");

			var params = {
				sheetType: 'proposal',
				sheetData: {
					singleMapper: {
						customer_name: $scope.task_model.customer_name,
						customer_contact: $scope.task_model.customer_contact,
						customer_tel: $scope.task_model.customer_tel,
						customer_email: $scope.task_model.customer_email,
						customer_address: $scope.task_model.customer_address,

						task_id: $scope.task_model.id,

						proposal_date: $scope.task_model.proposalSheet.proposal_date.split('T')[0],
						proposal_topic: $scope.task_model.proposalSheet.proposal_topic,
						proposal_content: $scope.task_model.proposalSheet.proposal_content,
						proposal_person: $scope.task_model.proposalSheet.proposal_person,
						proposal_translator: $scope.task_model.proposalSheet.proposal_translator,

						privilege: privileges.join(', ')
					}
				}
			};

			printService.print(params);
		};
	}]);
