/**
 * Created by Bli on 2014/6/12.
 */
angular.module('detail-editor', [])
	.controller('detailEditorController', [
		'$scope',
		function ($scope) {
			$scope.selectRow = function($event){
				var rowElement = $($event.currentTarget);

				rowElement.closest('table').find('tr').removeClass('active');
				rowElement.addClass('active');
				$scope.hasSelection = true;
			};
		}]);
