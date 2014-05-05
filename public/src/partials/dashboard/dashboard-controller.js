/**
 * Created by Bli on 2014/4/30.
 */
angular.module('dashboard', [
	'ngRoute',
	'customer-resource',
	'employee-resource'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: '/src/partials/dashboard/dashboard-view.tpl.html',
			controller: 'dashboardController',
			resolve: {
				customers: function (CUSTOMER) {
					return CUSTOMER.query().$promise;
				},
				employees: function (EMPLOYEE) {
					return EMPLOYEE.query().$promise;
				}
			}
		});
}]).controller('dashboardController', [
	'$scope',
	'customers',
	'employees',
	function ($scope, customers, employees) {
		/**
		 * Initialize the nano scrollers
		 */
		$(".nano").nanoScroller();
	}]);
