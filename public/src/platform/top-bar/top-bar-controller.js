/**
 * Created by Bohua on 14-2-13.
 */

angular.module('top-bar', ['login-session-service', 'task-service', 'permission-service', 'personal-settings', 'employee-list-service', 'about-dialog'])
	.controller('topBarController', [
		'$scope',
		'$rootScope',
		'$location',
		'$cookieStore',
		'loginSessionService',
		'taskService',
		'permissionService',
		'employeeListService',
		function ($scope, $rootScope, $location, $cookieStore, loginSessionService, taskService, permissionService, employeeListService) {
			var navBlockMap = {
				'/': '#nav-block-dashboard',
				'/dashboard': '#nav-block-dashboard',
				'/task-editor': '#nav-block-task',
				'/config/customer': '#nav-block-config',
				'/config/employee': '#nav-block-config'
			};

			$scope.loginUser = loginSessionService.getLoginUser().name;
			$scope.recentOpenedTasks = $cookieStore.get('recentOpenedTasks') || [];

			$scope.canAdd = permissionService.hasPermission('A003');
			$scope.canBackup = permissionService.hasPermission('C001');
			$scope.canRestore = permissionService.hasPermission('C002');

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
				$("#topbar-collapse").find(">ul>li").removeClass('active');
			}

			$scope.$on('$routeChangeSuccess', function () {
				trackNavBlock($location.path());
			});

			$scope.$on('event:onRecentOpenedTasks', function () {
				$scope.recentOpenedTasks = $cookieStore.get('recentOpenedTasks') || [];
			});

			$scope.$on('event:removeFromCookie', function (event, entry_id) {
				_.remove($scope.recentOpenedTasks, function (task) {
					return task.id === entry_id
				});
				$cookieStore.put('recentOpenedTasks', $scope.recentOpenedTasks);
			});

			$scope.signOff = function () {
				window.location.assign(window.location.origin);
			};

			$scope.goQuery = function(mode){
				$location.url("queryer/" + mode);
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
					expenseSheet: {},
					appointmentSheet: {},
					reminderSheet: {}
				};
				$($event.currentTarget).trigger('popup', ['new', defaultValue]);
			};

			$scope.onRegisterSaved = function (action, data) {
				taskService.saveTask(data).then(function (task) {
					$rootScope.$broadcast('event:reloadDashboard');
					$location.path('/task-editor/edit/' + task.id);
				});
			};

			/**
			 * Setup up search field
			 */
			taskService.ready().then(function () {
				$("#task-searcher").find("input").typeahead({
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

			/**
			 * Setup personal settings dialog
			 */
			$scope.personalSettingsConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/personal-settings/personal-settings-view.tpl.html'
			};

			$scope.showPersonalSettings = function ($event) {
				var defaultValue = {
					login: loginSessionService.getLoginPass()
				};
				$($event.currentTarget).trigger('popup', ['new', defaultValue]);
			};

			$scope.onPersonalSettingsSaved = function (action, data) {
				var o = {
					id: loginSessionService.getLoginUser().id,
					login: data.login
				};

				employeeListService.saveEmployee(o);
			};

			/**
			 * Backup
			 */
			$scope.backupDB = function () {
				var date = (new Date()).toJSON().split('T')[0];
				$scope.backupFileName = '备份数据' + date + '.rsp';

				var hiddenIFrameID = 'hiddenDownloader',
					iframe = document.getElementById(hiddenIFrameID);
				if (iframe === null) {
					iframe = document.createElement('iframe');
					iframe.id = hiddenIFrameID;
					iframe.style.display = 'none';
					document.body.appendChild(iframe);
				}
				iframe.src = '/backup/'+$scope.backupFileName;
			};

			/**
			 * Restore
			 */
			$scope.restoreDialogConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/restore-dialog/restore-dialog-view.tpl.html'
			};

			$scope.showRestoreDialog = function($event){
				$($event.currentTarget).trigger('popup');
			};

			/**
			 * Restore
			 */
			$scope.aboutDialogConfig = {
				dialogOption: {
					backdrop: 'static'
				},
				template: '/src/partials/about-dialog/about-dialog-view.tpl.html'
			};

			$scope.showAboutDialog = function($event){
				$($event.currentTarget).trigger('popup');
			};
		}]);
