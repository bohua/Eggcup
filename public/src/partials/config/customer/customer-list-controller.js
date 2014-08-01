/**
 * Created by Bli on 2014/4/28.
 */
angular.module('customer-list', [
	'ngRoute',
	'customer-resource',
	'tag-reference-service',
	'customer-list-service',
	'customer-editor',
	'permission-service'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/config/customer', {
			templateUrl: '/src/partials/config/customer/customer-list-view.tpl.html',
			controller: 'customerListController',
			resolve: {
				customerServiceDone: ['customerListService', function (customerListService) {
					return customerListService.ready();
				}]
			}
		});
}]).controller('customerListController', [
	'$scope',
	'CUSTOMER',
	'tagReferenceService',
	'customerListService',
	'permissionService',
	function ($scope, CUSTOMER, tagReferenceService, customerListService, permissionService) {
		/**
		 * Scope initializations
		 */
		$scope.headers = [
			'公司名称',
			'担当',
			'地址',
			'备注'
		];

		$scope.customer_list = customerListService.getCustomerList();

		$scope.canEdit = permissionService.hasPermission('B002');

		/**
		 * popup window configuration
		 */
		$scope.customerEditorConfig = {
			dialogOption: {
				backdrop: 'static'
			},
			template: '/src/partials/config/customer/customer-editor-view.tpl.html'
		};

		/**
		 * Closure functions
		 */
		function saveCustomer(model) {
			var customer = new CUSTOMER(model);
			customer.$save(function () {
				customerListService.reload().then(function (customerList) {
					$scope.customer_list = customerList;
				});
			});
		}

		function deleteCustomer(id) {
			CUSTOMER.delete(id, function () {
				customerListService.reload().then(function (customerList) {
					$scope.customer_list = customerList;
				});
			});
		}

		/**
		 * ng-click functions
		 */
		$scope.detail = function ($event, dataModel) {
			var mode = $scope.canEdit ? 'edit' : 'readOnly';
			$($event.target).parent('tr').trigger('popup', [mode, dataModel]);
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
	}]);