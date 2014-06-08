/**
 * Created by bli on 2014/5/8.
 */
angular.module('customer-list-service', ['customer-resource'])
	.factory('customerListService', ['CUSTOMER', '$q', function (CUSTOMER, $q) {
		var customerList;
		var Service = {
			init: function () {
				CUSTOMER.query(function(list){
					customerList = list;
				});
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
			},

			reload: function(){
				var deferred = $q.defer();

				CUSTOMER.query().$promise.then(function(list){
					customerList = list;
					deferred.resolve(customerList);
				});

				return deferred.promise;
			}
		};

		return Service;
	}]);