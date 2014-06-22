/**
 * Created by bli on 2014/6/11.
 */
angular.module('attach-editor', ['file-type-service'])
	.controller('attachEditorController', [
		'$scope',
		'fileTypeService',
		function ($scope, fileTypeService) {
			$scope.translateFileType = fileTypeService.translateFileType;

			function highlightLatestRow(){
				var trs = $('#attach-editor-form').find('tbody tr');
				$(trs[trs.length - 1]).effect('highlight',  {color: '#428bca'}, 1500);
			}

			$scope.fileUploaded = function(file){
				//scope.dialog_data_model
				$scope.dialog_data_model.push(file);
				$scope.$apply();
				highlightLatestRow();
			};

			$scope.tableHandlerOption = {
				hasFileUploader: false,
				hasCreateBtn: false,
				hasOpenBtn: false,
				hasDeleteBtn: true
			};
		}]);
