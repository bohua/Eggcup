/**
 * Created by Bohua on 2014-06-23.
 */
angular.module('config-service', [])
	.factory('configService', ['$http', '$q', function ($http, $q) {
		var configs = {},
			initiator;

		var configService = {
			init: function () {
				initiator = $q.defer();

				$http.get('/getConfigs')
					.success(function (map) {
						configs = map;
						initiator.resolve();
					})
					.error(function (error) {
						initiator.reject(error);
					});

				return initiator.promise;
			},

			ready: function () {
				return initiator;
			},

			getConfig: function (key) {
				return configs[key];
			}
		};

		return configService;
	}]);