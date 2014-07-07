/**
 * Created by Bohua on 2014-06-29.
 */
angular.module('queryer', [
	'ngRoute',
	'customer-list-service',
	'employee-list-service',
	'task-status-service',
	'permission-service'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/queryer/:queryMode', {
			templateUrl: '/src/partials/queryer/queryer-view.tpl.html',
			controller: 'taskQueryerController'
		});
}]).controller('taskQueryerController', [
	'$scope',
	'$routeParams',
	'$location',
	'$http',
	'customerListService',
	'employeeListService',
	'taskStatusService',
	'permissionService',
	function ($scope, $routeParams, $location, $http, customerListService, employeeListService, taskStatusService, permissionService) {
		switch ($routeParams.queryMode) {
			case 'account':
			{
				$scope.queryPath = '/taskByAccount';
				$scope.conditionTpl = "/src/partials/queryer/by-account/query-by-account-condition.tpl.html";
				$scope.resultTpl = "/src/partials/queryer/by-account/query-by-account-result.tpl.html";

				break;
			}
			case 'expense':
			{
				$scope.queryPath = '/taskByExpense';
				$scope.conditionTpl = "/src/partials/queryer/by-expense/query-by-expense-condition.tpl.html";
				$scope.resultTpl = "/src/partials/queryer/by-expense/query-by-expense-result.tpl.html";

				break;
			}

			default:
			{
				$scope.queryPath = '/task';
				$scope.conditionTpl = "/src/partials/queryer/by-task/query-by-task-condition.tpl.html";
				$scope.resultTpl = "/src/partials/queryer/by-task/query-by-task-result.tpl.html";

				break;
			}
		}

		$scope.customer_list = customerListService.getCustomerList();
		$scope.employee_list = employeeListService.getEmployeeList();
		$scope.translateStatus = taskStatusService.translateStatus;

		$scope.assigneeFieldOptions = {
			source: _.pluck(employeeListService.getEmployeeList(), 'name')
		};

		$scope.customerFieldOptions = {
			source: _.pluck(customerListService.getCustomerList(), 'name')
		};

		$scope.startQuery = function () {
			var params = {};
			$.map($scope.condition, function (c, index) {
				if (c) {
					params[index] = c;
				}
			});

			$http.get($scope.queryPath, {params: params}).success(function (data) {
				$scope.searchResult = data;
			});
		};

		$scope.openTask = function ($event, id) {
			//$($event.currentTarget).closest('.loading-mask').show();
			$location.path('/task-editor/edit/' + id);
		};


		/**
		 * Initialize query conditions
		 */
		$scope.condition = {
			start_date: new Date(),
			end_date: new Date(),
			status: 'all'
		};
	}]);