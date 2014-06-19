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
	'file-type-service',
	'task-status-service',
	'task-resource',
	'file-type-service',

	//No return value
	'register-section',
	'arrange-section',
	'reply-section',
	'proposal-section',
	'contract-section',
	'execute-section'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/task-editor/:action/:taskId', {
			templateUrl: '/src/partials/task-editor/task-editor-view.tpl.html',
			controller: 'taskEditorController',
			resolve: {
				task_model: ['$route', 'TASK', function ($route, TASK) {
					return TASK.get({task_id: $route.current.params.taskId}).$promise;
				}],
				file_type_service: ['fileTypeService', function (fileTypeService) {
					return fileTypeService.ready();
				}]
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
	'fileTypeService',
	'task_model',
	'TASK',
	function ($routeParams, $location, $http, $scope, $timeout, tagReferenceService, customerListService, employeeListService, taskStatusService, fileTypeService, task_model, TASK) {

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
						$scope.$broadcast('newArrange');
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
						$scope.$broadcast('newReply');
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
						$scope.$broadcast('newReply');
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
						$scope.$broadcast('newProposal');
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
						$scope.$broadcast('newContract');
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
						$scope.$broadcast('newSummary');
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

	}]);
