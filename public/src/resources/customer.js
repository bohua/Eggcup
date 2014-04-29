/**
 * Created by Bli on 2014/4/25.
 */
angular.module('customer-resource', ['ngResource'])
	.factory('CUSTOMER', ['$resource', function ($resource) {
		var CUSTOMER = $resource(
			'/customer/:customer_id',
			{
				customer_id: '@id'
			}
		);

		return CUSTOMER;
	}]);