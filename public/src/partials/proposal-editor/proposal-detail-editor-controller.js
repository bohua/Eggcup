/**
 * Created by Bli on 2014/6/12.
 */
angular.module('proposal-detail-editor', ['file-type-service'])
	.controller('proposalDetailEditorController', [
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
					service: '新服务',
					date: new Date(),
					expense: 0,
					traffic: 0,
					extra: 0
				}
			};
		}]);
