/**
 * Created by Bli on 14-2-10.
 */
angular.module('platform',
	['ngRoute',
		/*'preload-mask', */
		'left-menu',
		/*'router-guide',*/
		'top-bar',
		'popup-dialog',
		'ref-data-service'
	]).config(function ($routeProvider) {

	})
	.controller('platformController', ['$scope', '$rootScope', '$timeout', '$location', 'refDataService', function ($scope, $rootScope, $timeout, $location, refDataService) {

		/*
		 if ($location.path() !== '/') {
		 $location.path('/');
		 }
		 */

		/*
		 $timeout(function(){
		 $scope.$broadcast('emitPreloadMask', false);
		 }, 400);
		 */
	}]);