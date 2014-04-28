/**
 * Created by Bli on 2014/4/28.
 */
angular.module('customer-list', [
	'ngRoute',
	'customer-resource'
]).config(['$routeProvider', 'CUSTOMER', function ($routeProvider, CUSTOMER) {
	$routeProvider.
		when('/config/customer', {
			templateUrl: '/src/partials/config/customer/customer-list-view.tpl.html',
			controller: 'customerListController',
			resolve: {
				customers: CUSTOMER.query().$promise
			}
		});
}]).controller('customerListController', [
	'$scope',
	'CUSTOMER',
	function ($scope, CUSTOMER, customers) {
		$scope.headers = [
			'公司名称',
			'担当',
			'地址',
			'电话',
			'联系人'
		];

		$scope.customer_list = customers;

		$scope.customerDetailsConfig = {
			dialogOption: {
				overlay: true,
				shadow: true,
				flat: true,
				icon: '<i class="icon-briefcase"></i>',
				title: '详细信息',
				padding: 10,
				width: 800,
				height: 600,
				overlayClickClose: false
			},

			template: '/src/partials/config/customer/customer-detail-view.tpl.html',

			onShow: function (_dialogWin) {
				$.Metro.initInputs();
				_dialogWin.find('.auto-focus').focus();
			},

			api:{
				saveCustomer: saveCustomer,
				deleteCustomer: deleteCustomer
			}
		};

		/**
		 * Closure functions
		 */
		function saveCustomer(model){
			console.log('saved:', model);
			/*
			var customer = new CUSTOMER(model);
			customer.$save(function(){
				CUSTOMER.query();
			});
			*/
		}

		function deleteCustomer(model){
			console.log('deleted:', model);
		}

		/**
		 * ng-click functions
		 */
		$scope.detail=function($event, $index){
			console.log($event, $index);
		}
	}]);