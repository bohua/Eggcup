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
				var controlPanel = $('.control-buttons');

				rowElement.closest('table').find('tr').removeClass('active');
				rowElement.addClass('active');
				$scope.hasSelection = true;
			};
		}]);
