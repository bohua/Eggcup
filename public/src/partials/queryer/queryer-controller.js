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
		when('/queryer', {
			templateUrl: '/src/partials/queryer/queryer-view.tpl.html',
			controller: 'queryerController'
		});
}]).controller('queryerController', [
	'$scope',
	'$location',
	'$http',
	'customerListService',
	'employeeListService',
	'taskStatusService',
	'permissionService',
	function ($scope, $location, $http, customerListService, employeeListService, taskStatusService, permissionService) {
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

			$http.get('/task', {params: params}).success(function (data) {
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