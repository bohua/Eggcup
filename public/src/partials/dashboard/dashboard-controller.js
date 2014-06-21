/**
 * Created by Bli on 2014/4/30.
 */
angular.module('dashboard', [
	'ngRoute',
	//'ngAnimate',
	'customer-resource',
	'employee-resource',
	'task-service',
	'task-status-service',
	'customer-list-service'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: '/src/partials/dashboard/dashboard-view.tpl.html',
			controller: 'dashboardController',
			resolve: {
				'taskServiceDone': ['taskService', function (taskService) {
					return taskService.ready();
				}]
			}
		});
}]).controller('dashboardController', [
	'$scope',
	'$location',
	'taskService',
	'taskStatusService',
	'customerListService',
	function ($scope, $location, taskService, taskStatusService, customerListService) {
		/**
		 * Service binds
		 */
		$scope.translateStatus = taskStatusService.translateStatus;
		$scope.translateCustomer = customerListService.translateCustomer;
		$scope.taskList = groupingTasks(taskService.getTaskList());

		/**
		 * ng-click bindings
		 */
		$scope.detail = function ($event, dataModel) {
			$($event.currentTarget).find('.loading-mask').show();
			//$($event.currentTarget).trigger('popup', ['edit', dataModel]);
			$location.path('/task-editor/edit/' + dataModel.id);
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

		$scope.$on('reloadDashboard', function(){
			taskService.reload().then(function(newTaskList){
				$scope.taskList = groupingTasks(newTaskList);
			});
		});
	}]);

