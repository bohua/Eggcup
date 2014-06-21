/**
 * Created by Bohua on 14-2-13.
 */

angular.module('top-bar', ['login-session-service', 'task-service'])
	.controller('topBarController', [
		'$scope',
		'$rootScope',
		'$location',
		'loginSessionService',
		'taskService',
		function ($scope, $rootScope, $location, loginSessionService, taskService) {
			var navBlockMap = {
				'/': '#nav-block-dashboard',
				'/dashboard': '#nav-block-dashboard',
				'/task-editor': '#nav-block-task',
				'/config/customer': '#nav-block-config',
				'/config/employee': '#nav-block-config'
			};

			$scope.loginUser = loginSessionService.getLoginUser();

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
				taskService.saveTask(data).then(function (task) {
						$rootScope.$broadcast('reloadDashboard');
						$location.path('/task-editor/edit/' + task.id);
					});
			}

			/**
			 * Setup up search field
			 */
			taskService.ready().then(function(){
				$('#task-searcher input').typeahead({
						hint: true,
						highlight: true,
						minLength: 1
					},
					{
						name: 'tasks',
						displayKey: 'value',
						source: taskService.getSearchEngine().ttAdapter()
					}).on('typeahead:selected', function(event, selection){
						$location.path('/');

						taskService.openTask(selection.id);
						$(event.currentTarget).val('');
						$scope.$apply();

//						$scope.route = selection.value;
//						$scope.$apply();
					});
			});
//
//			$scope.$watch('route', function(next, pre){
//				if(next !== pre){
//					$location.path('/task-editor/edit/' + $scope.route);
//				}
//			})
		}]);
