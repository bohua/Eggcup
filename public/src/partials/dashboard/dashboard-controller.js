/**
 * Created by Bli on 2014/4/30.
 */
angular.module('dashboard', [
	'ngRoute',
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
	'tasks',
	'taskStatusService',
	'customerListService',
	function ($scope, tasks, taskStatusService, customerListService) {
		/**
		 * Initialize the nano scrollers
		 */
		$(".nano").nanoScroller();

		/**
		 * popup window configuration
		 */
		$scope.taskEditorConfig = {
			dialogOption: {
				overlay: true,
				shadow: true,
				flat: true,
				icon: '<i class="icon-tag"></i>',
				title: '详细信息',
				padding: 10,
				width: '80%',
				height: '80%',
				overlayClickClose: false
			},

			template: '/src/partials/zxdj-view/zxdj-view.tpl.html',

			onShow: function (_dialogWin) {
				$.Metro.initInputs();
				_dialogWin.find('.auto-focus').focus();
			},

			api: {
			}
		};

		/**
		 * directive bindings
		 */
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

		/**
		 * Service binds
		 */
		$scope.translateStatus = taskStatusService.translateStatus;
		$scope.translateCustomer = customerListService.translateStatus;
		$scope.taskList = groupingTasks(tasks);

		/**
		 * ng-click bindings
		 */
		$scope.detail = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', ['edit', dataModel]);
		};
		$scope.newTask = function($event){
			$($event.currentTarget).trigger('popup', ['add']);
		};

		/**
		 * Grouping Tasks from fetched task list
		 * @param taskList
		 * @returns {{a1_register: {seq: number, title: string, sub_title: string, task_list: Array}, a2_arrange: {seq: number, title: string, sub_title: string, task_list: Array}, a3_proposal: {seq: number, title: string, sub_title: string, task_list: Array}, a4_contract: {seq: number, title: string, sub_title: string, task_list: Array}}}
		 */
		function groupingTasks(taskList) {
			var groups = {
				a1_register: {
					seq: 1,
					title: '登记',
					sub_title: 'Register',
					task_list: []
				},
				a2_arrange: {
					seq: 2,
					title: '接洽',
					sub_title: 'Arrange',
					task_list: []
				},
				a3_proposal: {
					seq: 3,
					title: '提案',
					sub_title: 'Proposal',
					task_list: []
				},
				a4_contract: {
					seq: 4,
					title: '合同',
					sub_title: 'Contract',
					task_list: []
				}
			};
			for (var i in taskList) {
				var task = taskList[i];

				if (task.status < 200) {
					groups.a1_register.task_list.push(task);
				}else if(task.status < 300){
					groups.a2_arrange.task_list.push(task);
				}else if(task.status < 400){
					groups.a3_proposal.task_list.push(task);
				}else if(task.status >= 400){
					groups.a4_contract.task_list.push(task);
				}
			}

			return groups;
		}
	}]);

