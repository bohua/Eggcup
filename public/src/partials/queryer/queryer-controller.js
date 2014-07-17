/**
 * Created by Bohua on 2014-06-29.
 */
angular.module('queryer', [
	'ngRoute',
	'customer-list-service',
	'employee-list-service',
	'task-status-service',
	'permission-service',
	'account-detail-editor',
	'expense-detail-editor'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/queryer/:queryMode', {
			templateUrl: '/src/partials/queryer/queryer-view.tpl.html',
			controller: 'taskQueryerController',
			reloadOnSearch: true
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
			var params = {
				tid: (new Date()).getTime()
			};
			$.map($scope.condition, function (c, index) {
				if (c) {
					if (_.isDate(c)) {
						c = c.toISOString();
					}
					params[index] = c;
				}
			});
			$location.search(params);
		};

		$scope.openTask = function ($event, id) {
			$location.path('/task-editor/edit/' + id);
		};

		/**
		 * Sum function
		 */
		$scope.sumField = function (data_model, field) {
			var total = 0,
				tmp;

			if (!data_model) {
				return 0;
			}

			$.map(data_model, function (record) {
				tmp = parseInt(record[field]);
				if (_.isNaN(tmp)) {
					tmp = 0;
				}
				total += tmp;
			});

			return total;
		}

		/**
		 * Account Detail Editor Initialization
		 */
		$scope.detailEditorConfig = {
			dialogOption: {
				backdrop: 'static',
				keyboard: false
			},
			template: '/src/partials/account-editor/account-detail-editor-view.tpl.html'
		};

		$scope.showDetailEditor = function ($event, dataModel) {
			$($event.currentTarget).trigger('popup', ['queryPop', dataModel.subItem || [], {task_id: dataModel.id}]);
		};

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
			$($event.currentTarget).trigger('popup', ['queryPop', dataModel.subItem || [], {task_id: dataModel.id}]);
		};

		/**
		 * Param parsing
		 */
		var params = $location.search();
		if (!_.isEmpty(params)) {
			$http.get($scope.queryPath, {params: params}).success(function (data) {
				if (_.isEmpty(data)) {
					alert('没有符合条件的数据!');
				}
				$scope.searchResult = data;
			});
		}

		/**
		 * Initialize query conditions
		 */
		$scope.condition = {
			start_date: params.start_date || new Date(),
			end_date: params.end_date || new Date(),
			status: params.status || 'all',
			employee_name: params.employee_name || '',
			customer_name: params.customer_name || ''
		};
	}]);