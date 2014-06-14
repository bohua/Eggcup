/**
 * Created by Bli on 2014/4/28.
 */
angular.module('employee-list', [
	'ngRoute',
	'employee-resource',
	'employee-editor',
	'tag-reference-service',
	'customer-list-service',
	'employee-list-service'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/config/employee', {
			templateUrl: '/src/partials/config/employee/employee-list-view.tpl.html',
			controller: 'employeeListController'
		});
}]).controller('employeeListController', [
	'$scope',
	'EMPLOYEE',
	'tagReferenceService',
	'customerListService',
	'employeeListService',
	function ($scope, EMPLOYEE, tagReferenceService, customerListService, employeeListService) {
		/**
		 * Scope initializations
		 */
		$scope.headers = [
			'姓名',
			'职位',
			'电话',
			'手机',
			'邮箱'
		];

		$scope.employee_list = employeeListService.getEmployeeList();

		$scope.employeeEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/config/employee/employee-editor-view.tpl.html'
		};

		/**
		 * Closure functions
		 */
		function saveEmployee(model) {
			employeeListService.saveEmployee(model).then(function () {
				$scope.employee_list = employeeListService.getEmployeeList();
			});
		}


		function deleteEmployee(id) {
			employeeListService.deleteEmployee(id).then(function () {
				$scope.employee_list = employeeListService.getEmployeeList();
			});
		}

		/**
		 * ng-click functions
		 */
		$scope.detail = function ($event, dataModel) {
			employeeListService.getEmployeeDetail(dataModel.id).then(function (employee) {
				$($event.target).parent('tr').trigger('popup', ['edit', employee]);
			});
		};

		$scope.newEmployee = function ($event) {
			$($event.currentTarget).trigger('popup', ['add']);
		};

		/**
		 * directive bindings
		 */
		$scope.confirmEmitted = function (action, data) {
			switch (action) {
				case 'update':
				{
					saveEmployee(data);
					break;
				}
				case 'remove':
				{
					deleteEmployee({id: data.id});
					break;
				}
			}
		}
	}]);