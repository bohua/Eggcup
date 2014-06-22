/**
 * Created by bli on 2014/6/9.
 */
angular.module('account-section', ['account-detail-editor'])
	.controller('accountSectionController', ['$scope', function ($scope) {
		/**
		 * Detail Editor Initialization
		 */
		$scope.detailEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/account-editor/account-detail-editor-view.tpl.html',
			onShow: function () {

			}
		};

		$scope.showDetailEditor = function ($event, dataModel) {
			dataModel = dataModel || [];
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};

		$scope.getDetailModel = function () {
			return $scope.task_model.accountSheet.subItem;
		}

		$scope.onDetailSaved = function (action, data) {
			$scope.task_model.accountSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				accountSheet: {
					id: $scope.task_model.accountSheet.id,
					subItem: data
				}
			}
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		}
	}]);
