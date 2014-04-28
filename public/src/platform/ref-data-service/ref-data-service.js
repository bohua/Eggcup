/**
 * Created by Bli on 2014/4/25.
 */
angular.module('ref-data-service', ['customer-resource'])
	.factory('refDataService', ['$rootScope', 'CUSTOMER', function ($rootScope, CUSTOMER) {
		var customer_list = CUSTOMER.query();

		var Service = {
			getCustomerList: function(){
				return customer_list;
			}
		};

		return Service;
	}]);