/**
 * Created by Bli on 2014/4/28.
 */
angular.module('customer-list', [
	'ngRoute',
	'ref-data-service'
]).config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/config/customer', {templateUrl: '/src/partials/config/customer/customer-list-view.tpl.html', controller: 'customerListController'});
}]).controller('customerListController', [
	'$scope',
	'$http',
	'$timeout',
	'$location',
	'refDataService',
	function ($scope, $http, $timeout, $location, refDataService) {

		/**
		 * ng-click functions
		 */
		$scope.getBack = function () {
			$location.path('/');
		};

		$scope.getAutoComplete = function () {
			console.log(refDataService.getCustomerList());
		};
	}]);