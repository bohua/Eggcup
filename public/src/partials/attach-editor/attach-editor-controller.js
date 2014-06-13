/**
 * Created by bli on 2014/6/11.
 */
angular.module('attach-editor', [])
	.controller('attachEditorController', [
		'$scope',
		function ($scope) {
			function highlightLatestRow(){
				var trs = $('#attach-editor-form').find('tbody tr');
				$(trs[trs.length - 1]).effect('highlight',  {color: '#428bca'}, 1500);
			}

			$scope.fileUploaded = function(file){
				var o = {
					'file_name': file[0].name,
					'file_ext' : file[0]['content-type'],
					'file_url' : file[0].path,
					'file_size' : file[0].size
				};

				$scope.dialog_data_model.push(o);
				$scope.$apply();
				highlightLatestRow();
			};

			$scope.tableHandlerOption = {
				hasFileUploader: false,
				hasCreateBtn: false,
				hasOpenBtn: true,
				hasDeleteBtn: true
			};
		}]);
