/**
 * Created by bli on 2014/6/9.
 */
angular.module('summary-section', ['summary-editor', 'print-service'])
	.controller('summarySectionController', ['$scope', 'printService', function ($scope, printService) {
		/**
		 * Summary Editor Initialization
		 */
		$scope.summaryEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/summary-editor/summary-editor-view.tpl.html'
		};

		$scope.showSummaryEditor = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getSummaryModel = function () {
			return $scope.task_model.summarySheet;
		};

		$scope.onSummarySaved = function (action, data) {
			$scope.task_model.summarySheet = data;
			var o = {
				id: $scope.task_model.id,
				summarySheet: data
			};
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		};

		$scope.printDoc = function () {
			var privileges = [];

			if ($scope.task_model.prop_internal) privileges.push("内部浏览");
			if ($scope.task_model.prop_external) privileges.push("客户浏览");

			var params = {
				sheetType: 'summary',
				sheetData: {
					singleMapper: {
						customer_name: $scope.task_model.customer_name,
						customer_contact: $scope.task_model.customer_contact,
						customer_tel: $scope.task_model.customer_tel,
						customer_email: $scope.task_model.customer_email,
						customer_address: $scope.task_model.customer_address,

						project_manager: $scope.task_model.executeSheet.project_manager,
						project_runner: $scope.task_model.executeSheet.project_runner,

						summary_content: $scope.task_model.summarySheet.summary_content,

						privilege: privileges.join(', ')
					}
				}
			};

			printService.print(params, '打印汇总表_TK' + $scope.task_model.id);
		};
	}]);
