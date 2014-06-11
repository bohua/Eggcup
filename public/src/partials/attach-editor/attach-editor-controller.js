/**
 * Created by bli on 2014/6/11.
 */
angular.module('attach-editor', [])
	.controller('attachEditorController', [
		'$scope',
		function ($scope) {
			$scope.hasSelection = _.size( $scope.dialog_data_model) > 0;

			$scope.selectRow = function($event){
				var rowElement = $($event.currentTarget);

				rowElement.closest('table').find('tr').removeClass('active');
				rowElement.addClass('active');
				$scope.hasSelection = true;
			};

			$scope.selectUploadFile = function(){
				$('#fileupload').click();
			};
			$('#fileupload').change(function(){
				$this = $(this);
				$('#fileupload-input').text($this.val());
			});
		}]);
