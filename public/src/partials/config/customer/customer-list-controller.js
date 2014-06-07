/**
 * Created by Bli on 2014/4/28.
 */
angular.module('customer-list', [
	'ngRoute',
	'customer-resource',
	'tag-reference-service',
	'customer-list-service',
	'employee-list-service',
	'customer-editor'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/config/customer', {
			templateUrl: '/src/partials/config/customer/customer-list-view.tpl.html',
			controller: 'customerListController'
		});
}]).controller('customerListController', [
	'$scope',
	'CUSTOMER',
	'tagReferenceService',
	'customerListService',
	'employeeListService',
	function ($scope, CUSTOMER, tagReferenceService, customerListService, employeeListService) {
		/**
		 * Scope initializations
		 */
		$scope.headers = [
			'公司名称',
			'担当',
			'地址',
			'电话',
			'联系人'
		];

		$scope.customer_list = customerListService.getCustomerList();
		$scope.employee_list = employeeListService.getEmployeeList();

		/**
		 * popup window configuration
		 */
		$scope.customerEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},

			template: '/src/partials/config/customer/customer-editor-view.tpl.html',

			onShow: function (_dialogWin) {

			}
		};

		/**
		 * Closure functions
		 */
		function saveCustomer(model) {
			var customer = new CUSTOMER(model);
			customer.$save(function () {
				$scope.customer_list = CUSTOMER.query();
			});

		}

		function deleteCustomer(id) {
			CUSTOMER.delete(id, function () {
				$scope.customer_list = CUSTOMER.query();
			});
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

		$scope.newCustomer = function ($event) {
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
					deleteCustomer({id: data.id});
					break;
				}
			}
		}




		$scope.showModal = function(){
			$('#customer-editor-form').modal();
		};
	}]);