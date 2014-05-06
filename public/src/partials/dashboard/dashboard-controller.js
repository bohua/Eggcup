/**
 * Created by Bli on 2014/4/30.
 */
angular.module('dashboard', [
	'ngRoute',
	'customer-resource',
	'employee-resource',
	'task-resource'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: '/src/partials/dashboard/dashboard-view.tpl.html',
			controller: 'dashboardController',
			resolve: {
				'customers': function (CUSTOMER) {
					return CUSTOMER.query().$promise;
				},
				'employees': function (EMPLOYEE) {
					return EMPLOYEE.query().$promise;
				},
				'tasks': function (TASK) {
					return TASK.query({statusGroup: ['ongoing']}).$promise;
				}
			}
		});
}]).controller('dashboardController', [
	'$scope',
	'customers',
	'employees',
	'tasks',
	function ($scope, customers, employees, tasks) {
		/**
		 * Initialize the nano scrollers
		 */
		$(".nano").nanoScroller();

		function groupingTasks(taskList) {
			var groups = {
				register: [],
				reply: [],
				contract: [],
				seal: []
			};
			for (var i in taskList) {
				var task = taskList[i];
				if (task.status < 200) {
					groups.register.push(task);
				}else if(task.status < 300){
					groups.reply.push(task);
				}else if(task.status < 400){
					groups.contract.push(task);
				}else if(task.status >= 400){
					groups.seal.push(task);
				}
			}

			return groups;
		}

		$scope.taskList = groupingTasks(tasks);
	}]);
