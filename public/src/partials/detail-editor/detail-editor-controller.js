/**
 * Created by Bli on 2014/6/12.
 */
angular.module('detail-editor', [])
	.controller('detailEditorController', [
		'$scope',
		function ($scope) {
			$scope.tableHandlerOption = {
				hasFileUploader: true,
				hasCreateBtn: true,
				hasOpenBtn: false,
				hasDeleteBtn: true,

				defaultRowValue : {
					service: '新服务',
					date: new Date(),
					expense: 0,
					traffic: 0,
					extra: 0
				}
			};
		}]);
