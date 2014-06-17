/**
 * Created by Bli on 2014/4/29.
 */
angular.module('task-editor', [
	'ngRoute',
	'ngAnimate',
	'keyboard-support',
	'tag-reference-service',
	'customer-list-service',
	'employee-list-service',
	'task-status-service',
	'task-resource',

	//No return value
	'register-section',
	'arrange-section',
	'proposal-section'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/task-editor/:action/:taskId', {
			templateUrl: '/src/partials/task-editor/task-editor-view.tpl.html',
			controller: 'taskEditorController',
			resolve: {
				task_model: function ($route, TASK) {
					return TASK.get({task_id: $route.current.params.taskId}).$promise;
				}
			}
		})
}]).controller('taskEditorController', [
	'$routeParams',
	'$location',
	'$http',
	'$scope',
	'$timeout',
	'tagReferenceService',
	'customerListService',
	'employeeListService',
	'taskStatusService',
	'task_model',
	'TASK',
	function ($routeParams, $location, $http, $scope, $timeout, tagReferenceService, customerListService, employeeListService, taskStatusService, task_model, TASK) {

		/**
		 * Initialize default values & functions
		 */
		$scope.task_model = task_model;

		/**
		 * view handlers binding
		 */
		$scope.employeeList = employeeListService.getEmployeeList();
		$scope.customerList = customerListService.getCustomerList();
		$scope.translateCustomer = customerListService.translateCustomer;
		$scope.translateEmployee = employeeListService.translateEmployee;
		$scope.translateStatus = taskStatusService.translateStatus;

		//Get possible precedence status
		$scope.statusStack = taskStatusService.getPrecedence($scope.task_model.status);

		(function renderProgressList (scope) {
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
				reply: {
					id: 'reply',
					title: '解答',
					code: 300,
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
					progressList['reply']

				];
			} else if (!scope.task_model.handling || scope.task_model.handling === 0) {
				scope.progressList = [
					progressList['register'],
					progressList['arrange'],
					progressList['reply'],
					progressList['summary']
				];
			} else {
				scope.progressList = [
					progressList['register'],
					progressList['arrange'],
					progressList['reply'],
					progressList['proposal'],
					progressList['contract'],
					progressList['execute'],
					progressList['account'],
					progressList['summary']
				];
			}

			scope.getProgressState = function (progressState) {
				if (scope.task_model.status === progressState) return 'ongoing';
				if (scope.task_model.status < progressState) return 'disabled';
				if (scope.task_model.status > progressState) return 'finished';
			}
		})($scope);

		/**
		 * Initialize Emitters
		 */
		$scope.delete = function () {
			var confirmResult = confirm('确认删除么？');
			if (confirmResult === true) {
				$scope.Confirm('remove', false);
			}
		}

		$scope.closeToggle = function () {
			$('li.dropdown.open').removeClass('open');
		};

		//Set backward button action
		$scope.getBack = function () {
			$location.path('/');
		}

		//Auto active the first section
		$timeout(function () {
			$($('ul.affix a')[0]).addClass('active');
		});

		$scope.$on('saveTaskModel', function (event, id, data) {
			TASK.save({task_id: id}, data);
		});

		$scope.onStatusChange = function (statusCode) {
			var answer = confirm('确认提交么？');
			if (!answer) {
				return;
			}

			switch (statusCode) {
				case 200:
				{
					$scope.task_model.status = statusCode;
					$scope.task_model.arrangeSheet = {};
					$scope.statusStack = taskStatusService.getPrecedence($scope.task_model.status);

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						arrangeSheet: $scope.task_model.arrangeSheet
					}, function () {
						$scope.$broadcast('newArrange');
					});

					break;
				}

				case 300:
				{
					$scope.task_model.status = statusCode;
					$scope.task_model.handling = 0;
					$scope.task_model.replySheet = {};
					$scope.statusStack = taskStatusService.getPrecedence($scope.task_model.status);

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						handling: $scope.task_model.handling,
						replySheet: $scope.task_model.replySheet
					}, function () {
						$scope.$broadcast('newReply');
					});

					break;
				}

				case 400:
				{
					$scope.task_model.status = 400;
					$scope.task_model.handling = 1;
					$scope.task_model.replySheet = {};
					$scope.statusStack = taskStatusService.getPrecedence($scope.task_model.status);

					TASK.save({task_id: $scope.task_model.id}, {
						id: $scope.task_model.id,
						status: $scope.task_model.status,
						handling: $scope.task_model.handling,
						replySheet: $scope.task_model.replySheet
					}, function () {
						$scope.$broadcast('newReply');
					});

					break;
				}
			}
		}

		/**
		 * Cross scope bindings
		 */
		$scope.downloadFile = function (url) {
			$http.get('/file-download', {params: {fileUrl: url}});
		};

	}]);
