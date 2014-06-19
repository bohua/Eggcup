/**
 * Created by Bli on 2014/6/12.
 */
angular.module('execute-detail-editor', ['file-type-service'])
	.controller('executeDetailEditorController', [
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
					execute_date: new Date()
				}
			};
		}]);
