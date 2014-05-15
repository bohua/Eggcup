/**
 * Created by Bohua on 14-2-13.
 */

angular.module('top-bar', [])
	.controller('topBarController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		$('#user-dropdown-menu').dropdown({
			effect: 'fade'
		});

		$scope.toggleLeftMenu = function() {
			$rootScope.$broadcast('toggleLeftMenu', true);
		}

		$scope.showUserMenu = function () {

		};
	}]);
