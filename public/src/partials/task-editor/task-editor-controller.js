/**
 * Created by Bli on 2014/4/29.
 */
angular.module('task-editor', [
	'ngRoute',
	//'ngAnimate',
	'keyboard-support',
	'tag-reference-service',
	'customer-list-service',
	'employee-list-service',
	'file-type-service',
	'task-status-service',
	'task-resource',
	'task-service',
	'permission-service',
	'login-session-service',
	'modal-service',

	//No return value
	'register-section',
	'arrange-section',
	'reply-section',
	'proposal-section',
	'contract-section',
	'execute-section',
	//'account-section',
	'summary-section',
	'final-section',
	'expense-detail-editor',
	'appointment-detail-editor',
	'reminder-detail-editor',
	'account-detail-editor',
	'abort-editor'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/task-editor/:action/:taskId', {
			templateUrl: '/src/partials/task-editor/task-editor-view.tpl.html',
			controller: 'taskEditorController',
			resolve: {
				task_model: ['$route', 'TASK', function ($route, TASK) {
					return TASK.get({task_id: $route.current.params.taskId}).$promise;
				}],
				fileTypeServiceDone: ['fileTypeService', function (fileTypeService) {
					return fileTypeService.ready();
				}]
			}
		});
}]).controller('taskEditorController', [
	'$location',
	'$http',
	'$rootScope',
	'$scope',
	'$timeout',
	'$interval',
	'$cookieStore',
	'tagReferenceService',
	'customerListService',
	'employeeListService',
	'taskStatusService',
	'fileTypeService',
	'taskService',
	'permissionService',
	'loginSessionService',
	'modalService',
	'task_model',
	'TASK',
	function ($location, $http, $rootScope, $scope, $timeout, $interval, $cookieStore, tagReferenceService, customerListService, employeeListService, taskStatusService, fileTypeService, taskService, permissionService, loginSessionService, modalService, task_model, TASK) {

		if (task_model.code === "ERR_DB_GET_NO_TASK") {
			$location.path('/');
		}

		var canRead = false,
			canEdit = false;

		if (!task_model.assignee ||
			task_model.assignee.indexOf(loginSessionService.getLoginUser().name) !== -1) {
			canRead = canEdit = true;
		}
		else if (permissionService.hasPermission('A001') ||
			task_model.prop_internal && permissionService.hasPermission('A011') ||
			task_model.prop_external && permissionService.hasPermission('A021')
			) {

			canRead = true;
			if (permissionService.hasPermission('A002')) {
				canEdit = true;
			}
		}

		$scope._canEditPermission = canEdit;
		if (task_model.status >= 800 || task_model.aborted) {
			canEdit = false;
		}

		if (!canRead) {
			$scope.back = function () {
				$location.path('/');
			};

			/*
			 $scope.count_down = 5;

			 $interval(function () {
			 $scope.count_down -= 1;
			 }, 1000);
			 */

			$('#task-disable-mask').show();
			$('#task-editor-form').css('-webkit-filter', 'blur(2px)');

			/*
			 $timeout(function () {
			 $scope.back();
			 }, $scope.count_down * 1000);
			 */
		} else {
			$('#task-disable-mask').hide();
		}

		$scope.canEdit = canEdit;

		/**
		 * Initialize task and sheets
		 */
		var sheetMap = {
			arrangeSheet: {type: 'arrange'},
			replySheet: {type: 'reply'},
			proposalSheet: {type: 'proposal'},
			contractSheet: {type: 'contract'},
			executeSheet: {type: 'execute'},
			accountSheet: {type: 'account'},
			summarySheet: {type: 'summary'},
			expenseSheet: {type: 'expense'},
			appointmentSheet: {type: 'appointment'},
			reminderSheet: {type: 'reminder'}
		};

		$scope.task_model = task_model;

		$scope.$on('$routeChangeSuccess', function () {
			var recentOpenedTasks = $cookieStore.get('recentOpenedTasks') || [];
			_.remove(recentOpenedTasks, function (task) {
				return task.id === task_model.id
			});
			recentOpenedTasks.unshift({id: task_model.id, slogan: task_model.slogan});
			$cookieStore.put('recentOpenedTasks', _.first(recentOpenedTasks, 10));

			$rootScope.$broadcast('event:onRecentOpenedTasks');
		});


		$scope.loadTask = function () {
			$.map(sheetMap, function (val, key) {
				taskService.getTaskSheet($scope.task_model.id, val.type).success(function (sheet_instance) {
					if (sheet_instance && sheet_instance != "null") {
						$scope.task_model[key] = sheet_instance;
					}
				});
			});
		};
		$scope.loadTask();


		/**
		 * view handlers binding
		 */
		$scope.employeeList = employeeListService.getEmployeeList();
		$scope.customerList = customerListService.getCustomerList();
		$scope.translateCustomer = customerListService.translateCustomer;
		$scope.translateEmployee = employeeListService.translateEmployee;
		$scope.translateStatus = taskStatusService.translateStatus;
		$scope.translateFileType = fileTypeService.translateFileType;

		//Get possible precedence status
		$scope.statusStack = taskStatusService.getPrecedence($scope.task_model.status);

		function renderProgressList(scope) {
			var progressList = {
				register: {
					id: 'register',
					code: 100,
					title: '登记',
					icon: 'fa-edit',
					href: '#page_register'
				},
				arrange: {
					id: 'arrange',
					code: 200,
					title: '审核',
					icon: 'fa-share-alt',
					href: '#page_arrange'
				},
				choose: {
					id: 'choose',
					code: 1001,
					title: '解答',
					icon: 'fa-random',
					href: '#page_reply'
				},
				reply_a: {
					id: 'reply_a',
					title: '回复',
					code: 300,
					icon: 'fa-envelope',
					href: '#page_reply'
				},
				reply_b: {
					id: 'reply_b',
					title: '解答',
					code: 400,
					icon: 'fa-comments-o',
					href: '#page_reply'
				},
				proposal: {
					code: 500,
					id: 'proposal',
					title: '提案',
					icon: 'fa-book',
					href: '#page_proposal'
				},
				contract: {
					code: 600,
					id: 'contract',
					title: '合同',
					icon: 'fa-legal',
					href: '#page_contract'
				},
				execute: {
					code: 600,
					id: 'execute',
					title: '执行',
					icon: 'fa-history',
					href: '#page_execute'
				},
				/*
				 account: {
				 id: 'account',
				 code: 600,
				 title: '收款',
				 icon: 'fa-bank',
				 href: '#page_account'
				 },
				 */
				summary: {
					id: 'summary',
					code: 700,
					title: '汇总',
					icon: 'fa-suitcase',
					href: '#page_summary'
				},
				final: {
					id: 'final',
					code: 800,
					title: '结案',
					icon: 'fa-database',
					href: '#page_final'
				}
			};

			if (!scope.task_model.status) scope.task_model.status = 100;

			if (scope.task_model.status <= 200) {
				scope.progressList = [
					progressList['register'],
					progressList['arrange'],
					progressList['choose']
				];

				if(scope.task_model.aborted){
					scope.progressList.push(progressList['final']);
				}
			} else if (!scope.task_model.handling || scope.task_model.handling === 0) {
				scope.progressList = [
					progressList['register'],
					progressList['arrange'],
					progressList['reply_a'],
					progressList['summary'],
					progressList['final']
				];
			} else {
				scope.progressList = [
					progressList['register'],
					progressList['arrange'],
					progressList['reply_b'],
					progressList['proposal'],
					progressList['contract'],
					progressList['execute'],
					//progressList['account'],
					progressList['summary'],
					progressList['final']
				];
			}

			scope.getProgressState = function (progressState) {
				//if (scope.task_model.status === progressState) return 'ongoing';
				if (progressState === 800 && scope.task_model.aborted) return 'aborted';
				if (scope.task_model.handling === 0 && progressState > 300 && progressState < 700) return 'disabled';

				if (scope.task_model.status < progressState) return 'disabled';
				if (scope.task_model.status >= progressState) return 'finished';
			}
		}

		renderProgressList($scope);

		/**
		 * Initialize Emitters
		 */
		$scope.deleteTask = function () {
			var msg = '确认删除任务么? [TK-' + task_model.id + ' "' + task_model.slogan + '"]';
			var confirmResult = confirm(msg);
			if (confirmResult === true) {
				TASK.delete({task_id: $scope.task_model.id}, function () {
					$location.url('/');

					$timeout(function () {
						$rootScope.$broadcast('event:reloadDashboard');
						$rootScope.$broadcast('event:removeFromCookie', task_model.id);
					});

				});

			}
		};

		$scope.closeToggle = function () {
			$('li.dropdown.open').removeClass('open');
		};

		//Auto active the first section
		$timeout(function () {
			$($('ul.affix a')[0]).addClass('active');
		});

		$scope.$on('event:saveTaskModel', function (event, id, data) {
			TASK.save({task_id: id}, data, function () {
				$scope.loadTask();
			});
		});

		$scope.onStatusChange = function (statusCode) {

			if (statusCode != 900) {
				var answer = confirm('确认提交么？');
				if (!answer) {
					return;
				}

				$scope.task_model.status = statusCode;
			}

			switch (statusCode) {
				case 200:
				{
					$scope.task_model.arrangeSheet = $scope.task_model.arrangeSheet || {};

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						arrangeSheet: $scope.task_model.arrangeSheet
					}, function () {
						$scope.loadTask();
					});

					break;
				}

				case 300:
				{
					$scope.task_model.handling = 0;
					$scope.task_model.replySheet = $scope.task_model.replySheet || {};
					//$scope.task_model.replySheet.consult_context = $scope.task_model.register_content;

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						handling: $scope.task_model.handling,
						replySheet: $scope.task_model.replySheet
					}, function () {
						$scope.loadTask();
					});

					break;
				}

				case 400:
				{
					$scope.task_model.handling = 1;
					$scope.task_model.replySheet = $scope.task_model.replySheet || {};
					//$scope.task_model.replySheet.consult_context = $scope.task_model.register_content;

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						handling: $scope.task_model.handling,
						replySheet: $scope.task_model.replySheet
					}, function () {
						$scope.loadTask();
					});

					break;
				}
				case 500:
				{
					$scope.task_model.proposalSheet = $scope.task_model.proposalSheet || {};

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						proposalSheet: $scope.task_model.proposalSheet
					}, function () {
						$scope.loadTask();
					});

					break;
				}
				case 600:
				{

					$scope.task_model.contractSheet = $scope.task_model.contractSheet || {};
					$scope.task_model.executeSheet = $scope.task_model.executeSheet || {};
					$scope.task_model.accountSheet = $scope.task_model.accountSheet || {};

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						contractSheet: $scope.task_model.contractSheet,
						executeSheet: $scope.task_model.executeSheet,
						accountSheet: $scope.task_model.accountSheet
					}, function () {
						$scope.loadTask();
					});

					break;
				}
				case 700:
				{
					$scope.task_model.summarySheet = $scope.task_model.summarySheet || {};

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						summarySheet: $scope.task_model.summarySheet
					}, function () {
						$scope.loadTask();
					});

					break;
				}
				case 800:
				{
					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status
					}, function () {
						//$scope.$broadcast('closeTask');
						$scope.canEdit = false;
					});
					break;
				}

				case 900:
				{
					var abortEditorConfig = {
						dialogOption: {
							backdrop: 'static',
							keyboard: false
						},
						template: '/src/partials/abort-editor/abort-editor-view.tpl.html',
						onConfirm: function (action, data) {
							$scope.task_model.aborted = true;
							$scope.task_model.abort_date = data.abort_date;
							$scope.task_model.abort_person = data.abort_person;
							$scope.task_model.abort_reason = data.abort_reason;

							var o = {
								id: $scope.task_model.id,
								aborted: true,
								abort_date: data.abort_date,
								abort_person: data.abort_person,
								abort_reason: data.abort_reason
							};
							$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
							$scope.canEdit = false;

							renderProgressList($scope);
						}
					};

					var dataModel = {
						abort_date: (new Date()).toJSON().split('T')[0],
						abort_person: loginSessionService.getLoginUser().name
					};

					modalService.showDialog($scope, abortEditorConfig, dataModel);

					return;
				}
			}

			$scope.statusStack = taskStatusService.getPrecedence($scope.task_model.status);
			renderProgressList($scope);
		};

		/**
		 * Cross scope bindings
		 */
		$scope.downloadFile = function (url) {
			$http.get('/file-download', {params: {fileUrl: url}});
		};


		function getEditorMode(){
			if($scope.task_model.aborted){
				return 'readOnly';
			}

			if(!$scope._canEditPermission){
				return 'readOnly';
			}

			return 'edit'
		}
		/**
		 * Expense Detail Editor Initialization
		 */
		$scope.expenseEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/expense-editor/expense-detail-editor-view.tpl.html'
		};

		$scope.showExpenseEditor = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', [getEditorMode(), $scope.task_model.expenseSheet.subItem || []]);
		};

		$scope.onExpenseSaved = function (action, data) {
			$scope.task_model.expenseSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				expenseSheet: {
					id: $scope.task_model.expenseSheet.id,
					subItem: data
				}
			};
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		};

		/**
		 * Appointment Detail Editor Initialization
		 */
		$scope.appointmentDetailEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/appointment-editor/appointment-detail-editor-view.tpl.html'
		};

		$scope.showAppointmentDetailEditor = function ($event) {
			var mode = $scope.canEdit ? 'edit' : 'readOnly';
			if ($($event.currentTarget).hasClass('disabled')) {
				return;
			}
			$($event.currentTarget).trigger('popup', [mode, $scope.task_model.appointmentSheet.subItem || []]);
		};

		$scope.onAppointmentDetailSaved = function (action, data) {
			$scope.task_model.appointmentSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				appointmentSheet: {
					id: $scope.task_model.appointmentSheet.id,
					subItem: data
				}
			};
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		}


		/**
		 * Reminder Detail Editor Initialization
		 */
		$scope.reminderDetailEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/reminder-editor/reminder-detail-editor-view.tpl.html'
		};

		$scope.showReminderDetailEditor = function ($event) {
			if ($($event.currentTarget).hasClass('disabled')) {
				return;
			}
			$($event.currentTarget).trigger('popup', [getEditorMode(), $scope.task_model.reminderSheet.subItem || []]);
		};

		$scope.onReminderDetailSaved = function (action, data) {
			$scope.task_model.reminderSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				reminderSheet: {
					id: $scope.task_model.reminderSheet.id,
					subItem: data
				}
			};
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		}

		/**
		 * Account Detail Editor Initialization
		 */
		$scope.accountDetailEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/account-editor/account-detail-editor-view.tpl.html'
		};

		$scope.showAccountDetailEditor = function ($event) {
			if (!$scope.task_model.accountSheet) {
				$scope.task_model.accountSheet = {
					subItem: []
				}
			}

			if ($($event.currentTarget).hasClass('disabled')) {
				return;
			}
			$($event.currentTarget).trigger('popup', [getEditorMode(), $scope.task_model.accountSheet.subItem || []]);
		};

		$scope.onAccountDetailSaved = function (action, data) {
			$scope.task_model.accountSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				accountSheet: {
					id: $scope.task_model.accountSheet.id,
					subItem: data
				}
			};
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		};

	}]);
