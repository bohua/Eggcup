/**
 * Created by Bli on 2014/6/12.
 */
angular.module('expense-detail-editor', ['file-type-service'])
	.controller('expenseDetailEditorController', [
		'$scope',
		'$location',
		'fileTypeService',
		function ($scope, $location, fileTypeService) {
			$scope.translateFileType = fileTypeService.translateFileType;

			$scope.openTask = function () {
				$scope.Cancel();
				$location.path("/task-editor/edit/" + $scope.extra_args.task_id);
			};

			if ($scope.prop.mode === 'edit') {
				$scope.tableHandlerOption = {
					hasFileUploader: true,
					hasCreateBtn: true,
					hasOpenBtn: false,
					hasDeleteBtn: true,

					defaultRowValue: {
						expense_date: new Date(),
						expense_expense: 0,
						attachment: []
					}
				};
			} else {
				$scope.tableHandlerOption = {
					hasFileUploader: false,
					hasCreateBtn: false,
					hasOpenBtn: false,
					hasDeleteBtn: false
				};
			}
		}]);
