/**
 * Created by bli on 2014/6/11.
 */
angular.module('attach-editor', [])
	.controller('attachEditorController', [
		'$scope',
		function ($scope) {
			function selectLatestRow(){
				var trs = $('#attach-editor-form').find('tbody tr');
				trs.removeClass('active');
				$(trs[trs.length - 1]).addClass('active');
			}

			$scope.hasSelection = _.size( $scope.dialog_data_model) > 0;

			$scope.selectRow = function($event){
				var rowElement = $($event.currentTarget);

				rowElement.closest('table').find('tr').removeClass('active');
				rowElement.addClass('active');
				$scope.hasSelection = true;
			};

			$scope.fileUploaded = function(file){
				var o = {
					'file_name': file[0].name,
					'file_ext' : file[0]['content-type'],
					'file_url' : file[0].path,
					'file_size' : file[0].size

				};

				$scope.dialog_data_model.push(o);
				$scope.$apply();
				selectLatestRow();
			};
		}]);
