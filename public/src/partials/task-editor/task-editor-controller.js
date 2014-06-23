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

	//No return value
	'register-section',
	'arrange-section',
	'reply-section',
	'proposal-section',
	'contract-section',
	'execute-section',
	'account-section',
	'summary-section',
	'expense-detail-editor'
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
	'task_model',
	'TASK',
	function ($location, $http, $rootScope, $scope, $timeout, $interval, $cookieStore, tagReferenceService, customerListService, employeeListService, taskStatusService, fileTypeService, taskService, permissionService, loginSessionService, task_model, TASK) {

		if (task_model.code === "ERR_DB_GET_NO_TASK") {
			$location.path('/');
		}

		var canRead = false,
			canEdit = false;

		if (task_model.assignee.indexOf(loginSessionService.getLoginUser().name) !== -1) {
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

		if (task_model.status >= 800) {
			canEdit = false;
		}

		if (!canRead) {
			$scope.back = function () {
				$location.path('/');
			}

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
			expenseSheet: {type: 'expense'}
		}

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


		$.map(sheetMap, function (val, key) {
			taskService.getTaskSheet($scope.task_model.id, val.type).success(function (sheet_instance) {
				if (sheet_instance && sheet_instance != "null") {
					$scope.task_model[key] = sheet_instance;
				}
			});
		});


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
					title: '面谈',
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
				account: {
					id: 'account',
					code: 600,
					title: '收款',
					icon: 'fa-bank',
					href: '#page_account'
				},
				summary: {
					id: 'summary',
					code: 700,
					title: '汇总',
					icon: 'fa-suitcase',
					href: '#page_summary'
				},
				closed: {
					id: 'closed',
					code: 800,
					title: '结案',
					icon: 'fa-database',
					href: '#page_closed'
				}
			}

			var utilList = {
				expense: {
					id: 'expense',
					title: '费用',
					icon: 'fa-rmb',
					href: '#page_expense'
				}
			}

			if (!scope.task_model.status) scope.task_model.status = 100;

			if (scope.task_model.status <= 200) {
				scope.progressList = [
					progressList['register'],
					progressList['arrange'],
					progressList['choose']
				];
			} else if (!scope.task_model.handling || scope.task_model.handling === 0) {
				scope.progressList = [
					progressList['register'],
					progressList['arrange'],
					progressList['reply_a'],
					progressList['summary'],
					progressList['closed']
				];
			} else {
				scope.progressList = [
					progressList['register'],
					progressList['arrange'],
					progressList['reply_b'],
					progressList['proposal'],
					progressList['contract'],
					progressList['execute'],
					progressList['account'],
					progressList['summary'],
					progressList['closed']
				];
			}

			scope.getProgressState = function (progressState) {
				//if (scope.task_model.status === progressState) return 'ongoing';
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
		}

		$scope.closeToggle = function () {
			$('li.dropdown.open').removeClass('open');
		};

		//Auto active the first section
		$timeout(function () {
			$($('ul.affix a')[0]).addClass('active');
		});

		$scope.$on('event:saveTaskModel', function (event, id, data) {
			TASK.save({task_id: id}, data);
		});

		$scope.onStatusChange = function (statusCode) {
			var answer = confirm('确认提交么？');
			if (!answer) {
				return;
			}

			$scope.task_model.status = statusCode;

			switch (statusCode) {
				case 200:
				{
					$scope.task_model.arrangeSheet = $scope.task_model.arrangeSheet || {};

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						arrangeSheet: $scope.task_model.arrangeSheet
					}, function () {
						//$scope.$broadcast('newArrange');
					});

					break;
				}

				case 300:
				{
					$scope.task_model.handling = 0;
					$scope.task_model.replySheet = $scope.task_model.replySheet || {};

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						handling: $scope.task_model.handling,
						replySheet: $scope.task_model.replySheet
					}, function () {
						//$scope.$broadcast('newReply');
					});

					break;
				}

				case 400:
				{
					$scope.task_model.handling = 1;
					$scope.task_model.replySheet = $scope.task_model.replySheet || {};

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						handling: $scope.task_model.handling,
						replySheet: $scope.task_model.replySheet
					}, function () {
						//$scope.$broadcast('newReply');
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
						//$scope.$broadcast('newProposal');
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
						//$scope.$broadcast('newContract');
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
						//$scope.$broadcast('newSummary');
					});

					break;
				}
				case 800:
				{
					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status
					}, function () {
						$scope.$broadcast('closeTask');
					});
					break;
				}
			}

			$scope.statusStack = taskStatusService.getPrecedence($scope.task_model.status);
			renderProgressList($scope);
		}

		/**
		 * Cross scope bindings
		 */
		$scope.downloadFile = function (url) {
			$http.get('/file-download', {params: {fileUrl: url}});
		};


		/**
		 * Expense Detail Editor Initialization
		 */
		$scope.expenseEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/expense-editor/expense-detail-editor-view.tpl.html',
			onShow: function () {

			}
		};

		$scope.showExpenseEditor = function ($event, dataModel) {
			var mode = $scope.canEdit ? 'edit' : 'readOnly';
			dataModel = dataModel || [];
			$($event.currentTarget).trigger('popup', [mode, dataModel]);
		};

		$scope.getExpenseModel = function () {
			return $scope.task_model.expenseSheet.subItem;
		}

		$scope.onExpenseSaved = function (action, data) {
			$scope.task_model.expenseSheet.subItem = data;

			var o = {
				id: $scope.task_model.id,
				expenseSheet: {
					id: $scope.task_model.expenseSheet.id,
					subItem: data
				}
			}
			$scope.$emit('event:saveTaskModel', $scope.task_model.id, o);
		}
	}]);
