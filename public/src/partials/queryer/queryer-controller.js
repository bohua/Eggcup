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
				$scope.queryTitle = "收款查询";
				$scope.querySubTitle = "Query by Accounting";


				break;
			}
			case 'expense':
			{
				$scope.queryPath = '/taskByExpense';
				$scope.conditionTpl = "/src/partials/queryer/by-expense/query-by-expense-condition.tpl.html";
				$scope.resultTpl = "/src/partials/queryer/by-expense/query-by-expense-result.tpl.html";
				$scope.queryTitle = "费用查询";
				$scope.querySubTitle = "Query by Expenses";

				break;
			}

			default:
			{
				$scope.queryPath = '/task';
				$scope.conditionTpl = "/src/partials/queryer/by-task/query-by-task-condition.tpl.html";
				$scope.resultTpl = "/src/partials/queryer/by-task/query-by-task-result.tpl.html";
				$scope.queryTitle = "项目查询";
				$scope.querySubTitle = "Query by Tasks";

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

			if(!_.isEmpty($scope.condition.task_slogan)){
				params.task_slogan = $scope.condition.task_slogan;
			}else{
				$.map($scope.condition, function (c, index) {
					if (c) {
						if (_.isDate(c)) {
							c = c.toISOString();
						}
						params[index] = c;
					}
				});
			}

			$location.search(params);
		};

		$scope.openTask = function ($event, id) {
			$location.path('/task-editor/queryEdit/' + id);
		};

		$scope.clearField = function($event, field){
			eval("$scope." + field + "=''");
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
			task_slogan: params.task_slogan || '',
			start_date: params.start_date || new Date(),
			end_date: params.end_date || new Date(),
			status: params.status || 'all',
			employee_name: params.employee_name || '',
			customer_name: params.customer_name || ''
		};

		$scope.translateQueryStatus = function(status){
			switch (status){
				case 'all': return "所有状态";
				case 'ongoing': return "未结案";
				case 'closed': return "已结案";
				case 'unclear': return "欠款的合同";
				case 'clear': return "已结清的合同";
			}

			return '';
		};

		$scope.printResult = function(){
			window.print();
		}

		/**
		 * Filters
		 */
		$scope.hideZeroFn = function(row){
			if((row.contract_price && row.contract_price > 0) &&
				(row.account_total && row.account_total > 0)){
				return true;
			}

			return false;
		}

		/**
		 * Watches
		 */
//		$scope.$watch('condition.task_slogan', function(val){
//			if(!_.isEmpty(val)){
//
//			}
//		})
	}]);