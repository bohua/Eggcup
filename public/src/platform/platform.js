/**
 * Created by Bli on 14-2-10.
 */
angular.module('platform',
	['ngRoute',
		/*'preload-mask', */
		'left-menu-pop',
		/*'router-guide',*/
		'top-bar',
		'popup-dialog'
	]).config(function ($routeProvider) {

	})
	.controller('platformController', ['$scope', '$rootScope', '$timeout', '$location', function ($scope, $rootScope, $timeout, $location) {
		/*
		 $timeout(function(){
		 $scope.$broadcast('emitPreloadMask', false);
		 }, 400);
		 */
	}]);