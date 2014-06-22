/**
 * Created by Bohua on 14-2-13.
 */

angular.module('top-bar', ['login-session-service', 'task-service'])
	.controller('topBarController', [
		'$scope',
		'$rootScope',
		'$location',
		'$cookieStore',
		'loginSessionService',
		'taskService',
		function ($scope, $rootScope, $location, $cookieStore, loginSessionService, taskService) {
			var navBlockMap = {
				'/': '#nav-block-dashboard',
				'/dashboard': '#nav-block-dashboard',
				'/task-editor': '#nav-block-task',
				'/config/customer': '#nav-block-config',
				'/config/employee': '#nav-block-config'
			};

			$scope.loginUser = loginSessionService.getLoginUser().name;
			$scope.recentOpenedTasks = $cookieStore.get('recentOpenedTasks') || []

//			$scope.route = null;

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

			$scope.$on('event:onRecentOpenedTasks', function () {
				$scope.recentOpenedTasks = $cookieStore.get('recentOpenedTasks') || [];
			});

			$scope.$on('event:removeFromCookie', function(event, entry_id){
				_.remove($scope.recentOpenedTasks, function(task){ return task.id === entry_id});
				$cookieStore.put('recentOpenedTasks', $scope.recentOpenedTasks);
			});

			$scope.signOff = function () {
				loginSessionService.logout();
			}

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
					reporter: loginSessionService.getLoginUser().name,
					assignee: loginSessionService.getLoginUser().name,
					status: 100,
					expenseSheet: {}
				}
				$($event.currentTarget).trigger('popup', ['new', defaultValue]);
			};

			$scope.onRegisterSaved = function (action, data) {
				taskService.saveTask(data).then(function (task) {
					$rootScope.$broadcast('event:reloadDashboard');
					$location.path('/task-editor/edit/' + task.id);
				});
			}

			/**
			 * Setup up search field
			 */
			taskService.ready().then(function () {
				$('#task-searcher input').typeahead({
						hint: true,
						highlight: true,
						minLength: 1
					},
					{
						name: 'tasks',
						displayKey: 'value',
						source: taskService.getSearchEngine().ttAdapter()
					}).on('typeahead:selected', function (event, selection) {
						$location.path('/');

						taskService.openTask(selection.id);
						$(event.currentTarget).val('');
						$scope.$apply();
					});
			});
		}]);
