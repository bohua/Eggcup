/**
 * Created by Bli on 2014/6/12.
 */
angular.module('expense-detail-editor', ['file-type-service'])
	.controller('expenseDetailEditorController', [
		'$scope',
		'fileTypeService',
		function ($scope, fileTypeService) {
			$scope.translateFileType = fileTypeService.translateFileType;

			$scope.tableHandlerOption = {
				hasFileUploader: true,
				hasCreateBtn: true,
				hasOpenBtn: false,
				hasDeleteBtn: true,

				defaultRowValue: {
					expense_date: new Date(),
					expense_expense: 0
				}
			};
		}]);
