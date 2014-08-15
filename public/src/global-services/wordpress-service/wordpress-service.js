/**
 * Created by bli on 2014/5/8.
 */
angular.module('wordpress-service', ['wordpress-resource'])
	.factory('wordpressService', ['WORDPRESS', '$q', function (WORDPRESS, $q) {

		var Service = {
			init: function () {
				initiator = WORDPRESS.query(function(list){
					customerList = list;
				}).$promise;

				return initiator;
			},

			ready: function(){
				return initiator;
			},

			getWordpressList: function () {
				return WORDPRESS.query().$promise;
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

				WORDPRESS.query().$promise.then(function(list){
					customerList = list;
					deferred.resolve(customerList);
				});

				return deferred.promise;
			}
		};

		return Service;
	}]);