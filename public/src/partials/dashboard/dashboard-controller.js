/**
 * Created by Bli on 2014/4/30.
 */
angular.module('dashboard', [
	'ngRoute',
	'ngAnimate',
	'customer-resource',
	'employee-resource',
	'task-resource',
	'task-status-service',
	'customer-list-service'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: '/src/partials/dashboard/dashboard-view.tpl.html',
			controller: 'dashboardController',
			resolve: {
				'tasks': function (TASK) {
					return TASK.query({statusGroup: ['ongoing']}).$promise;
				}
			}
		});
}]).controller('dashboardController', [
	'$scope',
	'$location',
	'tasks',
	'taskStatusService',
	'customerListService',
	function ($scope, $location, tasks, taskStatusService, customerListService) {

		/**
		 * popup window configuration
		 */
		/*
		$scope.taskEditorConfig = {
			dialogOption: {
				overlay: true,
				shadow: true,
				flat: true,
				icon: '<i class="icon-tag"></i>',
				title: '详细信息',
				padding: 10,
				width: '90%',
				height: '90%',
				overlayClickClose: false
			},

			template: '/src/partials/task-editor/task-editor-view.tpl.html',

			onShow: function (_dialogWin) {
				$.Metro.initInputs();
				$.Metro.initTabs();
				_dialogWin.find('.auto-focus').focus();
			},

			api: {
			}
		};
		*/

		/**
		 * directive bindings
		 */
		/*
		$scope.confirmEmitted = function (action, data) {
			switch (action) {
				case 'update':
				{
					//saveCustomer(data);
					break;
				}
				case 'remove':
				{
					//deleteCustomer({id: data.id});
					break;
				}
			}
		}
		*/

		/**
		 * Service binds
		 */
		$scope.translateStatus = taskStatusService.translateStatus;
		$scope.translateCustomer = customerListService.translateCustomer;
		$scope.taskList = groupingTasks(tasks);

		/**
		 * ng-click bindings
		 */
		$scope.detail = function ($event, dataModel) {
			//$($event.currentTarget).trigger('popup', ['edit', dataModel]);
			$location.path('/task-editor/edit/' + dataModel.id);
		};
		$scope.newTask = function ($event) {
			//$($event.currentTarget).trigger('popup', ['add']);
			$location.path('/task-editor/new/' + new Date().toString());
		};

		/**
		 * Grouping Tasks from fetched task list
		 * @param taskList
		 * @returns {{a1_register: {seq: number, title: string, sub_title: string, task_list: Array}, a2_arrange: {seq: number, title: string, sub_title: string, task_list: Array}, a3_proposal: {seq: number, title: string, sub_title: string, task_list: Array}, a4_contract: {seq: number, title: string, sub_title: string, task_list: Array}}}
		 */
		function groupingTasks(taskList) {
			var groups = [
				{
					seq: 1,
					title: '接洽',
					sub_title: 'Arrange',
					task_list: []
				},
				{
					seq: 2,
					title: '提案',
					sub_title: 'Proposal',
					task_list: []
				},
				{
					seq: 3,
					title: '合同',
					sub_title: 'Contract',
					task_list: []
				},
				{
					seq: 4,
					title: '结案',
					sub_title: 'Conclude',
					task_list: []
				}
			];
			for (var i in taskList) {
				var task = taskList[i];

				if (task.status < 500) {
					groups[0].task_list.push(task);
				} else if (task.status < 600) {
					groups[1].task_list.push(task);
				} else if (task.status < 700) {
					groups[2].task_list.push(task);
				} else if (task.status < 800) {
					groups[3].task_list.push(task);
				}
			}

			return groups;
		}
	}]);

