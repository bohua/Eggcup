/**
 * Created by Bohua on 14-2-13.
 */

angular.module('top-bar', ['login-session-service'])
	.controller('topBarController', [
		'$scope',
		'$location',
		'loginSessionService',
		function ($scope, $location, loginSessionService) {
			var navBlockMap = {
				'/': '#nav-block-dashboard',
				'/dashboard': '#nav-block-dashboard',
				'/task-editor': '#nav-block-task',
				'/config/customer': '#nav-block-config',
				'/config/employee': '#nav-block-config'
				};

			$scope.loginUser = loginSessionService.getLoginUser();

			function trackNavBlock (route) {

				unTrackNavBlocks();

				if (route.match(/^\/task-editor\//)) {
					route = '/task-editor';
				}
				if (navBlockMap[route]) {
					$(navBlockMap[route]).addClass('active');
				}
			}

			function unTrackNavBlocks () {
				$('#topbar-collapse>ul>li').removeClass('active');
			}

			$scope.$on('$routeChangeSuccess', function () {
				trackNavBlock($location.path());
			});
		}]);
