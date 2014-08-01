/**
 * Created by Bli on 2014/6/12.
 */
angular.module('about-dialog', ['config-service'])
	.controller('aboutDialogController', [
		'$scope',
		'configService',
		function ($scope, configService) {
			$scope.version = configService.getConfig('version');
			$scope.vendor = configService.getConfig('vendor');
			$scope.telList = configService.getConfig('telList');
			$scope.emailList = configService.getConfig('emailList');
		}]);
