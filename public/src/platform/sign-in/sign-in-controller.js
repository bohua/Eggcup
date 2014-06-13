/**
 * Created by Bli on 2014/6/13.
 */
angular.module('sign-in', ['ngRoute'])
	.controller('signInController', [
	'$scope',
	'$rootScope',
	'$location',
	function ($scope, $rootScope, $location) {
		$scope.signin = function(){
			$('.jumbotron').animate({
				opacity : 0,
				top: '-=300px'
			}, 1000, function(){
				$rootScope.hasSignIn = true;
				$rootScope.$apply();
				$location.path('/');
			});
		};
	}]);