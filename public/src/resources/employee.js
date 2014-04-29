/**
 * Created by Bli on 2014/4/29.
 */
angular.module('employee-resource', ['ngResource'])
	.factory('EMPLOYEE', ['$resource', function ($resource) {
		var EMPLOYEE = $resource(
			'/employee/:employee_id',
			{
				employee_id: '@id'
			}
		);

		return EMPLOYEE;
	}]);