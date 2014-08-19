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
		$scope.queryPath = '/getWordpressList';
		$scope.displayMode = 'list';

		/**
		 * Param parsing
		 */
		var params = $location.search();

		$http.get($scope.queryPath, {params: params}).success(function (data) {
			$scope.wordpressList = data;
		});
		if (!_.isEmpty(params) && _.isEmpty(data)) {
			alert('没有符合条件的数据!');
		}

		/**
		 * Initialize query conditions
		 */
		$scope.condition = {
			topic: params.topic || '',
			start_date: params.start_date || new Date(),
			end_date: params.end_date || new Date(),
			customer_name: params.customer_name || ''
		};

		/**
		 * ng-click bindings
		 */
		$scope.getWordpress = function(model){
			$scope.displayMode = 'detail';

			$scope.currentWordpress = model;
		}

		$scope.backToListMode = function(){
			$scope.displayMode = 'list';

			$scope.currentWordpress = null;
		}
	}]);