/**
 * Created by bli on 2014/6/9.
 */
angular.module('contract-section', ['contract-editor', 'contract-detail-editor'])
	.controller('contractSectionController', ['$scope', function ($scope) {
		/**
		 * Contract Editor Initialization
		 */
		$scope.contractEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/contract-editor/contract-editor-view.tpl.html'
		};

		$scope.showContractEditor = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getContractModel = function () {
			return $scope.task_model.contractSheet;
		}

		$scope.onContractSaved = function (action, data) {
			$scope.task_model.contractSheet = data;
			var o = {
				id: $scope.task_model.id,
				contractSheet: data
			}
			$scope.$emit('saveTaskModel', $scope.task_model.id, o);
		}

		/**
		 * Detail Editor Initialization
		 */
		$scope.detailEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/contract-editor/contract-detail-editor-view.tpl.html',
			onShow: function () {

			}
		};

		$scope.showDetailEditor = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getDetailModel = function () {
			return $scope.task_model.contractSheet.subItem;
		}

		$scope.onDetailSaved = function (action, data) {
			$scope.task_model.contractSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				contractSheet: {
					id: $scope.task_model.contractSheet.id,
					subItem: data
				}
			}
			$scope.$emit('saveTaskModel', $scope.task_model.id, o);
		}
	}]);
