/**
 * Created by bli on 2014/5/8.
 */
angular.module('customer-list-service', ['customer-resource'])
	.factory('customerListService', ['CUSTOMER', function (CUSTOMER) {
		var customerList;
		var Service = {
			init: function () {
				customerList = CUSTOMER.query();
			},

			getCustomerList: function () {
				return customerList;
			},

			translateCustomer: function (customerId) {
				var found = _.where(customerList, {id: customerId});
				if (found.length === 0) {
					return customerId;
				} else {
					return found[0].name;
				}
			}
		};

		return Service;
	}]);