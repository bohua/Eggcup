/**
 * Created by Bli on 2014/6/12.
 */
angular.module('account-detail-editor', ['file-type-service'])
	.controller('accountDetailEditorController', [
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
					account_date: new Date(),
					account_expense: 0,
					attachment: []
				}
			};
		}]);
