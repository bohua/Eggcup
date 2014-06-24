/**
 * Created by Bli on 2014/6/12.
 */
angular.module('appointment-detail-editor', [])
	.controller('appointmentDetailEditorController', [
		'$scope',
		function ($scope) {
			$scope.tableHandlerOption = {
				hasFileUploader: false,
				hasCreateBtn: false,
				hasOpenBtn: false,
				hasDeleteBtn: true
			};
		}]);
