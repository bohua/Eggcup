/**
 * Created by Bohua on 14-2-13.
 */

angular.module('top-bar', ['login-session-service', 'task-resource'])
	.controller('topBarController', [
		'$scope',
		'$rootScope',
		'$location',
		'loginSessionService',
		'TASK',
		function ($scope, $rootScope, $location, loginSessionService, TASK) {
			var navBlockMap = {
				'/': '#nav-block-dashboard',
				'/dashboard': '#nav-block-dashboard',
				'/task-editor': '#nav-block-task',
				'/config/customer': '#nav-block-config',
				'/config/employee': '#nav-block-config'
			};

			$scope.loginUser = loginSessionService.getLoginUser();

			function trackNavBlock(route) {

				unTrackNavBlocks();

				if (route.match(/^\/task-editor\//)) {
					route = '/task-editor';
				}
				if (navBlockMap[route]) {
					$(navBlockMap[route]).addClass('active');
				}
			}

			function unTrackNavBlocks() {
				$('#topbar-collapse>ul>li').removeClass('active');
			}

			$scope.$on('$routeChangeSuccess', function () {
				trackNavBlock($location.path());
			});


			/**
			 * Create new Task
			 */
			$scope.registerEditorConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/register-editor/register-editor-view.tpl.html'
			};

			$scope.showRegisterEditor = function ($event) {
				var defaultValue = {
					report_date: new Date(),
					reporter: loginSessionService.getLoginUser(),
					status: 100
				}
				$($event.currentTarget).trigger('popup', ['new', defaultValue]);
			};

			$scope.onRegisterSaved = function (action, data) {
				TASK.save(data)
					.$promise.then(function () {
						$rootScope.$broadcast('reloadDashboard');
					});
			}
		}]);
