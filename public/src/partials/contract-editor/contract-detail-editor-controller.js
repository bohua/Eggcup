/**
 * Created by Bli on 2014/6/12.
 */
angular.module('contract-detail-editor', ['file-type-service'])
	.controller('contractDetailEditorController', [
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
					pay_date: new Date(),
					expense: 0,
					due_date: new Date()
				}
			};
		}]);
