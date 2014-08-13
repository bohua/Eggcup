/**
 * Created by bli on 2014/8/13.
 */
angular.module('wordpress', [
	'ngRoute',
	'customer-list-service',
	'employee-list-service',
	'permission-service'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/wordpress', {
			templateUrl: '/src/partials/wordpress/wordpress-view.tpl.html',
			controller: 'wordpressController',
			reloadOnSearch: true
		});
}]).controller('wordpressController', [
	'$scope',
	'$routeParams',
	'$location',
	'$http',
	'customerListService',
	'employeeListService',
	'permissionService',
	function ($scope, $routeParams, $location, $http, customerListService, employeeListService, permissionService) {
		$scope.condition= {};
	}]);