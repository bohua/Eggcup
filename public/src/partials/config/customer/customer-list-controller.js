/**
 * Created by Bli on 2014/4/28.
 */
angular.module('customer-list', [
	'ngRoute',
	'customer-resource',
	'employee-resource',
	'customer-editor'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/config/customer', {
			templateUrl: '/src/partials/config/customer/customer-list-view.tpl.html',
			controller: 'customerListController',
			resolve: {
				customers: function (CUSTOMER) {
					return CUSTOMER.query().$promise;
				},
				employees: function (EMPLOYEE) {
					return EMPLOYEE.query().$promise;
				}
			}
		});
}]).controller('customerListController', [
	'$scope',
	'CUSTOMER',
	'customers',
	'employees',
	function ($scope, CUSTOMER, customers, employees) {

		$scope.headers = [
			'公司名称',
			'担当',
			'地址',
			'电话',
			'联系人'
		];

		$scope.customer_list = customers;
		$scope.employee_list = employees;

		$scope.customerDetailsConfig = {
			dialogOption: {
				overlay: true,
				shadow: true,
				flat: true,
				icon: '<i class="icon-briefcase"></i>',
				title: '详细信息',
				padding: 10,
				width: '80%',
				height: '90%',
				overlayClickClose: false
			},

			template: '/src/partials/config/customer/customer-editor-view.tpl.html',

			onShow: function (_dialogWin) {
				$.Metro.initInputs();
				_dialogWin.find('.auto-focus').focus();
			},

			api: {
				getEmployeeList: getEmployeeList
			}
		};

		/**
		 * Closure functions
		 */
		function saveCustomer(model) {
			console.log('saved:', model);
			 var customer = new CUSTOMER(model);
			 customer.$save(function(){
				 $scope.customer_list = CUSTOMER.query();
			 });

		}

		function deleteCustomer(model) {
			console.log('deleted:', model);
		}

		function getEmployeeList() {
			return $scope.employee_list;
		}

		/**
		 * ng-click functions
		 */
		$scope.detail = function ($event, dataModel) {
			$($event.target).parent('tr').trigger('popup', ['edit', dataModel]);
		};

		$scope.new = function ($event) {
			$($event.currentTarget).trigger('popup', ['add']);
		};

		/**
		 * directive bindings
		 */
		$scope.confirmEmitted = function (action, data) {
			switch (action) {
				case 'update':
				{
					saveCustomer(data);
					break;
				}
				case 'remove':
				{
					deleteCustomer(data);
					break;
				}
			}
		}
	}]);