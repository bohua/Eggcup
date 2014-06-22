/**
 * Created by bli on 2014/6/9.
 */
angular.module('execute-section', ['execute-editor', 'execute-detail-editor'])
	.controller('executeSectionController', ['$scope', function ($scope) {
		/**
		 * Execute Editor Initialization
		 */
		$scope.executeEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/execute-editor/execute-editor-view.tpl.html'
		};

		$scope.showExecuteEditor = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getExecuteModel = function () {
			return $scope.task_model.executeSheet;
		}

		$scope.onExecuteSaved = function (action, data) {
			$scope.task_model.executeSheet = data;
			var o = {
				id: $scope.task_model.id,
				executeSheet: data
			}
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		}

		/**
		 * Detail Editor Initialization
		 */
		$scope.detailEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/execute-editor/execute-detail-editor-view.tpl.html',
			onShow: function () {

			}
		};

		$scope.showDetailEditor = function ($event, dataModel) {
			dataModel = dataModel || [];
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getDetailModel = function () {
			return $scope.task_model.executeSheet.subItem;
		}

		$scope.onDetailSaved = function (action, data) {
			$scope.task_model.executeSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				executeSheet: {
					id: $scope.task_model.executeSheet.id,
					subItem: data
				}
			}
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		}
	}]);
