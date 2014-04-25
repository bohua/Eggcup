/**
 * Created by Bli on 2014/4/25.
 */
angular.module('customer-resource', ['ngResource'])
	.factory('CUSTOMER', ['$resource', function ($resource) {
		var CUSTOMER = $resource(
			'/kh/:kh_id',
			{
				kh_id: '@id'
			},
			{
				getAll: {
					method: 'GET',
					params: {
						getAll:true
					}
				}
			}
		);

		return CUSTOMER;
	}]);