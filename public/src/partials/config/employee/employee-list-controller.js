/**
 * Created by Bli on 2014/4/28.
 */
angular.module('employee-list', [
	'ngRoute',
	'employee-resource',
	'employee-editor',
	'tag-reference-service',
	'customer-list-service',
	'employee-list-service',
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

			template: '/src/partials/config/employee/employee-editor-view.tpl.html',

			onShow: function (_dialogWin) {

			}
		};

		/**
		 * Closure functions
		 */
		function saveEmployee(model) {
			var employee = new EMPLOYEE(model);
			employee.$save(function () {
				employeeListService.reload().then(function(employeeList){
					$scope.employee_list = employeeList;
				});
			});
		}



		function deleteEmployee(id) {
			EMPLOYEE.delete(id, function(){
				employeeListService.reload().then(function(employeeList){
					$scope.employee_list = employeeList;
				});
			});
		}

		/**
		 * ng-click functions
		 */
		$scope.detail = function ($event, dataModel) {
			$($event.target).parent('tr').trigger('popup', ['edit', dataModel]);
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