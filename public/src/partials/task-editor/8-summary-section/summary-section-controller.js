/**
 * Created by bli on 2014/6/9.
 */
angular.module('summary-section', ['summary-editor'])
	.controller('summarySectionController', ['$scope', function ($scope) {
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
		}

		$scope.onSummarySaved = function (action, data) {
			$scope.task_model.summarySheet = data;
			var o = {
				id: $scope.task_model.id,
				summarySheet: data
			}
			$scope.$emit('saveTaskModel', $scope.task_model.id, o);
		}
	}]);
