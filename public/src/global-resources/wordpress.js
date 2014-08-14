/**
 * Created by bli on 2014/8/14.
 */
angular.module('wordpress-resource', ['ngResource'])
	.factory('WORDPRESS', ['$resource', function ($resource) {
		var WORDPRESS = $resource(
			'/wordpress/:wordpress_id',
			{
				wordpress_id: '@id'
			}
		);

		return WORDPRESS;
	}]);